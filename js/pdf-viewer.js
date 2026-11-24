import * as pdfjsLib from '../vendor/pdfjs/pdf.min.mjs';
import { PageFlip } from '../vendor/page-flip/page-flip.module.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    '../vendor/pdfjs/pdf.worker.min.mjs',
    import.meta.url
).href;

/**
 * Visor Flipbook propio con efecto realista de hojear páginas (PDF.js + StPageFlip locales, cero terceros).
 */
export class CensoPdfViewer {
    constructor({ pdfUrl, seccionesIndice = [] }) {
        this.pdfUrl = pdfUrl;
        this.seccionesIndice = seccionesIndice;

        this.doc = null;
        this.pageFlip = null;
        this.bookPages = []; // [{ bookIndex, pdfPage, half: 'full'|'left'|'right', el, canvas }]
        this.renderedPdfPages = new Set();
        this.renderingPdfPages = new Set();
        this.currentPageIndex = 0; // 0-based en bookPages
        this.pageAspect = 612 / 792;
        this.baseBookW = 0;
        this.baseBookH = 0;
        this.zoom = 1;
        this.minZoom = 1;
        this.maxZoom = 2;
        this.thumbsBuilt = false;
        this.userFlippedOnce = false;

        this.el = {
            viewer: document.getElementById('censo-viewer'),
            stage: document.getElementById('censo-stage'),
            scroll: document.getElementById('censo-canvas-scroll'),
            zoomWrap: document.getElementById('censo-zoom-wrap'),
            mount: document.getElementById('censo-flipbook'),
            hint: document.getElementById('censo-flip-hint'),
            loader: document.getElementById('censo-loader'),
            loaderText: document.getElementById('censo-loader-text'),
            progressBar: document.getElementById('censo-progress-bar'),
            sectionSelect: document.getElementById('censo-section-select'),
            thumbsToggle: document.getElementById('censo-thumbs-toggle'),
            thumbs: document.getElementById('censo-thumbs'),
            zoomOut: document.getElementById('censo-zoom-out'),
            zoomReset: document.getElementById('censo-zoom-reset'),
            zoomIn: document.getElementById('censo-zoom-in'),
            fullscreen: document.getElementById('censo-fullscreen'),
            prevFloat: document.getElementById('censo-prev-float'),
            nextFloat: document.getElementById('censo-next-float'),
            prev: document.getElementById('censo-prev'),
            next: document.getElementById('censo-next'),
            counter: document.getElementById('censo-page-counter'),
            slider: document.getElementById('censo-page-slider')
        };

        this.bindEvents();
        this.loadDocument();
    }

    bindEvents() {
        const goPrev = () => {
            if (!this.pageFlip) return;
            this.pageFlip.flipPrev('top');
        };
        const goNext = () => {
            if (!this.pageFlip) return;
            this.pageFlip.flipNext('top');
        };

        this.el.prev.addEventListener('click', goPrev);
        this.el.prevFloat.addEventListener('click', goPrev);
        this.el.next.addEventListener('click', goNext);
        this.el.nextFloat.addEventListener('click', goNext);

        this.el.slider.addEventListener('input', (e) => {
            if (!this.pageFlip) return;
            const targetIdx = Math.max(0, Math.min(this.bookPages.length - 1, Number(e.target.value) - 1));
            this.pageFlip.turnToPage(targetIdx);
        });

        this.el.sectionSelect.addEventListener('change', (e) => {
            if (!this.pageFlip) return;
            const targetIdx = Math.max(0, Math.min(this.bookPages.length - 1, Number(e.target.value) - 1));
            this.flipTo(targetIdx);
        });

        this.el.zoomIn.addEventListener('click', () => this.setZoom(this.zoom + 0.25));
        this.el.zoomOut.addEventListener('click', () => this.setZoom(this.zoom - 0.25));
        this.el.zoomReset.addEventListener('click', () => this.setZoom(1));

        this.el.thumbsToggle.addEventListener('click', () => this.toggleThumbnails());

        this.el.fullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                this.el.viewer.requestFullscreen?.().catch(() => {});
            } else {
                document.exitFullscreen?.().catch(() => {});
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (this.pageFlip) {
                setTimeout(() => this.rebuildFlipbookSize(), 120);
            }
        });

        this.el.viewer.addEventListener('keydown', (e) => {
            if (!this.pageFlip) return;
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                goNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goPrev();
            } else if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                this.setZoom(this.zoom + 0.25);
            } else if (e.key === '-') {
                e.preventDefault();
                this.setZoom(this.zoom - 0.25);
            }
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            if (!this.pageFlip) return;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.rebuildFlipbookSize(), 220);
        });
    }

    flipTo(targetIdx) {
        if (!this.pageFlip) return;
        const diff = Math.abs(targetIdx - this.currentPageIndex);
        if (diff <= 4) {
            this.pageFlip.flip(targetIdx, 'top');
        } else {
            this.pageFlip.turnToPage(targetIdx);
        }
    }

    async loadDocument() {
        try {
            const loadingTask = pdfjsLib.getDocument({
                url: this.pdfUrl,
                disableAutoFetch: false,
                disableStream: false
            });

            loadingTask.onProgress = ({ loaded, total }) => {
                if (total > 0) {
                    const pct = Math.min(100, Math.round((loaded / total) * 100));
                    this.el.progressBar.style.width = `${pct}%`;
                    this.el.loaderText.textContent = `Cargando publicación CEFP (${pct}%)...`;
                } else if (loaded > 0) {
                    const mb = (loaded / (1024 * 1024)).toFixed(1);
                    this.el.loaderText.textContent = `Cargando publicación CEFP (${mb} MB)...`;
                }
            };

            this.doc = await loadingTask.promise;
            this.el.loaderText.textContent = 'Preparando páginas interactivas...';

            await this.buildBookPageMap();
            this.initFlipbook(0);

            // Renderizar portada y primer pliego de inmediato antes de quitar el loader
            await this.renderPdfPage(1);
            if (this.doc.numPages >= 2) {
                await this.renderPdfPage(2);
            }

            this.populateSectionSelect();
            this.el.slider.max = String(this.bookPages.length);
            this.el.slider.value = '1';
            this.el.slider.disabled = false;
            this.updateControls();
            this.el.loader.hidden = true;

            // Pre-renderizar el resto de páginas en segundo plano para que hojear sea instantáneo
            this.renderRemainingInBackground();
        } catch (err) {
            console.error('Error al cargar el flipbook propio:', err);
            this.renderFallback();
        }
    }

    async buildBookPageMap() {
        this.bookPages = [];
        let bookIndex = 0;

        for (let p = 1; p <= this.doc.numPages; p++) {
            const page = await this.doc.getPage(p);
            const vp = page.getViewport({ scale: 1 });
            const isSpread = vp.width > vp.height * 1.35;

            if (p === 1) {
                this.pageAspect = isSpread ? (vp.width / 2) / vp.height : vp.width / vp.height;
            }

            if (isSpread) {
                this.bookPages.push(this.createBookPageItem(bookIndex++, p, 'left', false));
                this.bookPages.push(this.createBookPageItem(bookIndex++, p, 'right', false));
            } else {
                const isCover = p === 1 || p === this.doc.numPages;
                this.bookPages.push(this.createBookPageItem(bookIndex++, p, 'full', isCover));
            }
        }
    }

    createBookPageItem(bookIndex, pdfPage, half, isCover) {
        const div = document.createElement('div');
        div.className = `flip_page${isCover ? ' flip_page--cover' : ''}`;
        if (isCover) {
            div.setAttribute('data-density', 'hard');
        }

        const canvas = document.createElement('canvas');
        const loading = document.createElement('div');
        loading.className = 'flip_page__loading';
        loading.textContent = `Pág. ${bookIndex + 1}`;

        div.append(canvas, loading);

        return { bookIndex, pdfPage, half, isCover, el: div, canvas };
    }

    computePageDimensions() {
        const rect = this.el.stage.getBoundingClientRect();
        const isPortraitMode = rect.width <= 760;
        const padX = isPortraitMode ? 56 : 108;
        const padY = 36;

        const availW = Math.max(220, rect.width - padX);
        const availH = Math.max(280, rect.height - padY);

        const maxPageW = isPortraitMode ? availW : availW / 2;
        let pageH = Math.floor(Math.min(availH, maxPageW / this.pageAspect));
        let pageW = Math.round(pageH * this.pageAspect);

        if (pageW > maxPageW) {
            pageW = Math.floor(maxPageW);
            pageH = Math.round(pageW / this.pageAspect);
        }

        return {
            width: Math.max(200, pageW),
            height: Math.max(260, pageH),
            isPortraitMode
        };
    }

    initFlipbook(startPageIndex = 0) {
        if (this.pageFlip) {
            try {
                this.pageFlip.destroy();
            } catch (_) {
                // noop
            }
            this.pageFlip = null;
        }

        // Reemplazar mount limpio (StPageFlip.destroy() elimina el elemento raíz)
        const freshMount = document.createElement('div');
        freshMount.id = 'censo-flipbook';
        freshMount.className = 'flipbook_mount';
        freshMount.setAttribute('aria-label', 'Libro interactivo del CEFP');
        this.el.zoomWrap.innerHTML = '';
        this.el.zoomWrap.appendChild(freshMount);
        this.el.mount = freshMount;

        // Re-adjuntar nodos de página (conservando sus canvas ya renderizados)
        const pageEls = this.bookPages.map((bp) => {
            bp.el.removeAttribute('style');
            bp.el.classList.remove('--left', '--right', '--simple', 'stf__item');
            freshMount.appendChild(bp.el);
            return bp.el;
        });

        const { width, height, isPortraitMode } = this.computePageDimensions();
        this.baseBookW = isPortraitMode ? width : width * 2;
        this.baseBookH = height;

        this.pageFlip = new PageFlip(freshMount, {
            width,
            height,
            size: 'fixed',
            minWidth: 200,
            maxWidth: 780,
            minHeight: 260,
            maxHeight: 980,
            showCover: true,
            drawShadow: true,
            maxShadowOpacity: 0.18,
            flippingTime: 650,
            usePortrait: isPortraitMode,
            startZIndex: 2,
            autoSize: true,
            showPageCorners: false,
            mobileScrollSupport: false,
            useMouseEvents: true,
            clickEventForward: false,
            startPage: startPageIndex
        });

        this.pageFlip.loadFromHTML(pageEls);
        this.currentPageIndex = startPageIndex;

        this.pageFlip.on('flip', (e) => {
            this.currentPageIndex = e.data;
            if (!this.userFlippedOnce) {
                this.userFlippedOnce = true;
                this.el.hint?.classList.add('is-hidden');
            }
            this.updateControls();
            this.renderPriorityAround(this.currentPageIndex);
        });

        this.applyZoomTransform();
    }

    rebuildFlipbookSize() {
        if (!this.doc || !this.bookPages.length) return;
        const keepIndex = this.currentPageIndex;
        this.initFlipbook(keepIndex);
        this.updateControls();
    }

    setZoom(nextZoom) {
        const clamped = Math.max(this.minZoom, Math.min(this.maxZoom, Number(nextZoom.toFixed(2))));
        if (clamped === this.zoom) return;
        this.zoom = clamped;
        this.el.zoomReset.textContent = `${Math.round(this.zoom * 100)}%`;
        this.applyZoomTransform();
    }

    applyZoomTransform() {
        const zoomed = this.zoom > 1.02;
        this.el.scroll.classList.toggle('is-zoomed', zoomed);

        if (zoomed) {
            this.el.zoomWrap.style.width = `${Math.round(this.baseBookW * this.zoom)}px`;
            this.el.zoomWrap.style.height = `${Math.round(this.baseBookH * this.zoom)}px`;
            this.el.mount.style.transformOrigin = 'top left';
            this.el.mount.style.transform = `scale(${this.zoom})`;
        } else {
            this.el.zoomWrap.style.width = '';
            this.el.zoomWrap.style.height = '';
            this.el.mount.style.transform = '';
            this.el.scroll.scrollTo({ top: 0, left: 0 });
        }
    }

    async renderPdfPage(pdfPageNum) {
        if (
            !this.doc ||
            pdfPageNum < 1 ||
            pdfPageNum > this.doc.numPages ||
            this.renderedPdfPages.has(pdfPageNum) ||
            this.renderingPdfPages.has(pdfPageNum)
        ) {
            return;
        }

        this.renderingPdfPages.add(pdfPageNum);

        try {
            const page = await this.doc.getPage(pdfPageNum);
            const baseVp = page.getViewport({ scale: 1 });
            // Escala exacta 2x para 792pt (1584px alto), garantizando mitades enteras sin costuras ni recortes
            const targetHeight = 1584;
            const scale = targetHeight / baseVp.height;
            const vp = page.getViewport({ scale });

            const targets = this.bookPages.filter((bp) => bp.pdfPage === pdfPageNum);

            if (targets.length === 1 && targets[0].half === 'full') {
                const canvas = targets[0].canvas;
                canvas.width = Math.round(vp.width);
                canvas.height = Math.round(vp.height);
                await page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport: vp
                }).promise;
                targets[0].el.classList.add('is-rendered');
            } else {
                const fullW = Math.round(vp.width / 2) * 2;
                const fullH = Math.round(vp.height);
                const off = document.createElement('canvas');
                off.width = fullW;
                off.height = fullH;
                await page.render({
                    canvasContext: off.getContext('2d'),
                    viewport: vp
                }).promise;

                const halfW = fullW / 2;
                for (const t of targets) {
                    t.canvas.width = halfW;
                    t.canvas.height = fullH;
                    const sx = t.half === 'right' ? halfW : 0;
                    t.canvas
                        .getContext('2d')
                        .drawImage(off, sx, 0, halfW, fullH, 0, 0, halfW, fullH);
                    t.el.classList.add('is-rendered');
                }
            }

            this.renderedPdfPages.add(pdfPageNum);
        } catch (err) {
            console.error(`Error renderizando PDF página ${pdfPageNum}:`, err);
        } finally {
            this.renderingPdfPages.delete(pdfPageNum);
        }
    }

    async renderPriorityAround(bookIdx) {
        const pagesToRender = new Set();
        for (let offset = -2; offset <= 4; offset++) {
            const bp = this.bookPages[bookIdx + offset];
            if (bp) pagesToRender.add(bp.pdfPage);
        }
        for (const p of pagesToRender) {
            await this.renderPdfPage(p);
        }
    }

    async renderRemainingInBackground() {
        for (let p = 1; p <= this.doc.numPages; p++) {
            if (!this.renderedPdfPages.has(p)) {
                await this.renderPdfPage(p);
                await new Promise((r) => setTimeout(r, 25));
            }
        }
    }

    populateSectionSelect() {
        this.el.sectionSelect.innerHTML = '';
        const total = this.bookPages.length;

        if (this.seccionesIndice.length > 0) {
            for (const sec of this.seccionesIndice) {
                if (sec.pagina <= total) {
                    const opt = document.createElement('option');
                    opt.value = String(sec.pagina);
                    opt.textContent = `Pág. ${sec.pagina} — ${sec.titulo}`;
                    this.el.sectionSelect.appendChild(opt);
                }
            }
        } else {
            for (let i = 1; i <= total; i++) {
                const opt = document.createElement('option');
                opt.value = String(i);
                opt.textContent = `Página ${i}`;
                this.el.sectionSelect.appendChild(opt);
            }
        }
        this.el.sectionSelect.disabled = false;
    }

    updateControls() {
        const total = this.bookPages.length;
        const pageNum = this.currentPageIndex + 1;
        const isLandscape = this.pageFlip?.getOrientation?.() === 'landscape';

        if (pageNum === 1) {
            this.el.counter.textContent = `Portada · 1 / ${total}`;
        } else if (pageNum === total) {
            this.el.counter.textContent = `Contraportada · ${total} / ${total}`;
        } else if (isLandscape && pageNum + 1 <= total) {
            const leftNum = pageNum % 2 === 0 ? pageNum : pageNum - 1;
            const rightNum = Math.min(total, leftNum + 1);
            this.el.counter.textContent = `Págs. ${leftNum}–${rightNum} de ${total}`;
        } else {
            this.el.counter.textContent = `Página ${pageNum} de ${total}`;
        }

        this.el.slider.value = String(pageNum);

        // Sincronizar selector de sección con la sección actual o anterior más cercana
        let bestSec = 1;
        for (const sec of this.seccionesIndice) {
            if (sec.pagina <= pageNum) bestSec = sec.pagina;
        }
        this.el.sectionSelect.value = String(bestSec);

        const isFirst = this.currentPageIndex <= 0;
        const isLast = this.currentPageIndex >= total - 1;
        this.el.prev.disabled = isFirst;
        this.el.prevFloat.disabled = isFirst;
        this.el.next.disabled = isLast;
        this.el.nextFloat.disabled = isLast;

        const activePdfPage = this.bookPages[this.currentPageIndex]?.pdfPage;
        const thumbButtons = this.el.thumbs.querySelectorAll('.visor_thumb_btn');
        thumbButtons.forEach((btn) => {
            const active = Number(btn.dataset.pdfPage) === activePdfPage;
            btn.classList.toggle('is-active', active);
            if (active && !this.el.thumbs.hidden) {
                btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        });
    }

    async toggleThumbnails() {
        const willOpen = this.el.thumbs.hidden;
        this.el.thumbs.hidden = !willOpen;
        this.el.thumbsToggle.classList.toggle('is-active', willOpen);
        this.el.thumbsToggle.setAttribute('aria-expanded', String(willOpen));

        if (willOpen && !this.thumbsBuilt && this.doc) {
            this.thumbsBuilt = true;
            await this.buildThumbnails();
        }
    }

    async buildThumbnails() {
        this.el.thumbs.innerHTML = '';
        for (let p = 1; p <= this.doc.numPages; p++) {
            const matching = this.bookPages.filter((bp) => bp.pdfPage === p);
            const firstIdx = matching[0]?.bookIndex ?? 0;
            const lastIdx = matching[matching.length - 1]?.bookIndex ?? firstIdx;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'visor_thumb_btn';
            btn.dataset.pdfPage = String(p);
            if (this.bookPages[this.currentPageIndex]?.pdfPage === p) {
                btn.classList.add('is-active');
            }

            const canvas = document.createElement('canvas');
            const label = document.createElement('span');
            if (p === 1) label.textContent = 'Portada';
            else if (p === this.doc.numPages) label.textContent = 'Final';
            else if (firstIdx !== lastIdx) label.textContent = `${firstIdx + 1}–${lastIdx + 1}`;
            else label.textContent = `${firstIdx + 1}`;

            btn.append(canvas, label);
            btn.addEventListener('click', () => this.flipTo(firstIdx));
            this.el.thumbs.appendChild(btn);

            try {
                const page = await this.doc.getPage(p);
                const base = page.getViewport({ scale: 1 });
                const scale = 132 / base.height;
                const vp = page.getViewport({ scale });
                canvas.width = Math.floor(vp.width);
                canvas.height = Math.floor(vp.height);
                await page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport: vp
                }).promise;
            } catch (_) {
                // ignora error individual de miniatura
            }
        }
    }

    renderFallback() {
        this.el.loader.hidden = true;
        this.el.prevFloat.hidden = true;
        this.el.nextFloat.hidden = true;
        if (this.el.hint) this.el.hint.hidden = true;
        this.el.scroll.innerHTML = `
            <div class="visor_fallback_box">
                <iframe src="${this.pdfUrl}" title="Resultados del Censo de Educación Financiera y Previsional"></iframe>
            </div>
        `;
    }
}

/**
 * Visor PDF ligero con caché en memoria para las Radiografías individuales por Afore.
 */
export class RadiografiaPdfViewer {
    constructor() {
        this.cache = new Map();
        this.currentDoc = null;
        this.currentUrl = null;
        this.zoom = 1;
        this.renderTask = null;
        this.loadToken = 0;

        this.el = {
            stage: document.getElementById('rad-pdf-stage'),
            scroll: document.getElementById('rad-pdf-scroll'),
            canvas: document.getElementById('rad-pdf-canvas'),
            loader: document.getElementById('rad-pdf-loader'),
            loaderText: document.getElementById('rad-pdf-loader-text'),
            filename: document.getElementById('rad-pdf-filename'),
            zoomOut: document.getElementById('rad-pdf-zoom-out'),
            zoomReset: document.getElementById('rad-pdf-zoom-reset'),
            zoomIn: document.getElementById('rad-pdf-zoom-in')
        };

        this.ctx = this.el.canvas.getContext('2d');
        this.bindEvents();
    }

    bindEvents() {
        this.el.zoomIn.addEventListener('click', () => this.setZoom(this.zoom + 0.25));
        this.el.zoomOut.addEventListener('click', () => this.setZoom(this.zoom - 0.25));
        this.el.zoomReset.addEventListener('click', () => this.setZoom(1));

        let timer;
        window.addEventListener('resize', () => {
            if (!this.currentDoc || this.el.stage.offsetParent === null) return;
            clearTimeout(timer);
            timer = setTimeout(() => this.render(), 150);
        });
    }

    setZoom(nextZoom) {
        const clamped = Math.max(0.75, Math.min(2.6, Number(nextZoom.toFixed(2))));
        if (clamped === this.zoom) return;
        this.zoom = clamped;
        this.el.zoomReset.textContent = `${Math.round(this.zoom * 100)}%`;
        this.el.scroll.classList.toggle('is-zoomed', this.zoom > 1.02);
        this.render();
    }

    async load(pdfUrl, label = 'Radiografía oficial PDF') {
        const token = ++this.loadToken;
        this.currentUrl = pdfUrl;
        this.zoom = 1;
        this.el.zoomReset.textContent = '100%';
        this.el.scroll.classList.remove('is-zoomed');
        this.el.filename.textContent = label;
        this.el.loader.hidden = false;
        this.el.loaderText.textContent = 'Cargando radiografía PDF...';

        try {
            let doc = this.cache.get(pdfUrl);
            if (!doc) {
                const task = pdfjsLib.getDocument({ url: pdfUrl });
                task.onProgress = ({ loaded, total }) => {
                    if (token !== this.loadToken) return;
                    if (total > 0) {
                        const pct = Math.min(100, Math.round((loaded / total) * 100));
                        this.el.loaderText.textContent = `Cargando radiografía PDF (${pct}%)...`;
                    }
                };
                doc = await task.promise;
                this.cache.set(pdfUrl, doc);
            }

            if (token !== this.loadToken) return;
            this.currentDoc = doc;
            await this.render();
            if (token === this.loadToken) {
                this.el.loader.hidden = true;
            }
        } catch (err) {
            if (token !== this.loadToken) return;
            console.error('Error al cargar PDF de radiografía:', err);
            this.el.loaderText.textContent =
                'No se pudo renderizar el PDF en este modo. Usa el botón de descarga para abrirlo.';
        }
    }

    async render() {
        if (!this.currentDoc) return;

        if (this.renderTask) {
            try {
                this.renderTask.cancel();
            } catch (_) {
                // noop
            }
        }

        const page = await this.currentDoc.getPage(1);
        const base = page.getViewport({ scale: 1 });
        const rect = this.el.stage.getBoundingClientRect();
        const availW = Math.max(260, rect.width - 36);
        const availH = Math.max(240, rect.height - 36);

        const fitScale = Math.min(availW / base.width, availH / base.height);
        const cssScale = fitScale * this.zoom;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const cssVp = page.getViewport({ scale: cssScale });
        const renderVp = page.getViewport({ scale: cssScale * dpr });

        this.el.canvas.width = Math.floor(renderVp.width);
        this.el.canvas.height = Math.floor(renderVp.height);
        this.el.canvas.style.width = `${Math.floor(cssVp.width)}px`;
        this.el.canvas.style.height = `${Math.floor(cssVp.height)}px`;

        this.renderTask = page.render({
            canvasContext: this.ctx,
            viewport: renderVp
        });

        try {
            await this.renderTask.promise;
        } catch (err) {
            if (err?.name !== 'RenderingCancelledException') {
                console.error('Error al renderizar radiografía PDF:', err);
            }
        }
    }
}
