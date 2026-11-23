import { AFORES_DATA, CENSO_CONFIG, PERSPECTIVAS_LISTA } from '../data/afores-data.js';

export class RadiografiasExplorer {
    constructor({ pdfViewer }) {
        this.pdfViewer = pdfViewer;
        this.activeAforeId = null;
        this.activeMode = 'pdf'; // 'pdf' | 'interactive'
        this.activeEje = 'todos'; // 'todos' | 'bienestar' | 'funcionamiento' | 'tramites'
        this.sortByActions = false;

        this.el = {
            grid: document.getElementById('afores-grid'),
            modal: document.getElementById('radiografia-modal'),
            sidebar: document.getElementById('rad-sidebar'),
            sidebarList: document.getElementById('rad-sidebar-list'),
            sidebarClose: document.getElementById('rad-sidebar-close'),
            sidebarBackdrop: document.getElementById('rad-sidebar-backdrop'),
            menuToggle: document.getElementById('rad-menu-toggle'),
            mobileStrip: document.getElementById('rad-mobile-strip'),
            activeLogo: document.getElementById('rad-active-logo'),
            activeTitle: document.getElementById('rad-active-title'),
            downloadBtn: document.getElementById('rad-download-btn'),
            closeBtn: document.getElementById('rad-close-btn'),
            tabInteractive: document.getElementById('rad-tab-interactive'),
            tabPdf: document.getElementById('rad-tab-pdf'),
            interactiveView: document.getElementById('rad-interactive-view'),
            pdfView: document.getElementById('rad-pdf-view'),
            kpis: document.getElementById('rad-kpis'),
            axesSummary: document.getElementById('rad-axes-summary'),
            ejeFilters: document.getElementById('rad-eje-filters'),
            sortToggle: document.getElementById('rad-sort-toggle'),
            subtemasList: document.getElementById('rad-subtemas-list'),
            perspCount: document.getElementById('rad-persp-count'),
            perspList: document.getElementById('rad-perspectivas-list'),
            openPdfInline: document.getElementById('rad-open-pdf-inline')
        };

        this.renderMainGrid();
        this.renderSidebarAndStrip();
        this.bindEvents();
        this.checkInitialHash();
    }

    renderMainGrid() {
        this.el.grid.innerHTML = '';
        for (const afore of AFORES_DATA) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'afore_card';
            btn.setAttribute('role', 'listitem');
            btn.setAttribute('aria-label', `Abrir radiografía interactiva de ${afore.nombre}`);
            btn.dataset.aforeId = afore.id;

            btn.innerHTML = `
                <div class="afore_card__logo_box">
                    <img class="afore_img" src="${afore.logo}" alt="Logo de ${afore.nombre}" loading="lazy">
                </div>
                <div class="afore_card__meta">
                    <span class="afore_card__name">${afore.nombreCorto}</span>
                    <span class="afore_card__cta">
                        Ver radiografía
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </span>
                </div>
            `;

            btn.addEventListener('click', () => this.open(afore.id));
            this.el.grid.appendChild(btn);
        }
    }

    renderSidebarAndStrip() {
        this.el.sidebarList.innerHTML = '';
        this.el.mobileStrip.innerHTML = '';

        for (const afore of AFORES_DATA) {
            // Item menú lateral izquierdo
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'rad_sidebar__item';
            item.dataset.aforeId = afore.id;
            item.innerHTML = `
                <span class="rad_sidebar__logo_pill">
                    <img src="${afore.logo}" alt="" loading="lazy">
                </span>
                <span class="rad_sidebar__info">
                    <span class="rad_sidebar__name">${afore.nombreCorto}</span>
                    <span class="rad_sidebar__sub">${afore.ficha.totalAcciones} acciones</span>
                </span>
                <span class="rad_sidebar__rank">#${afore.ficha.ranking}</span>
            `;
            item.addEventListener('click', () => {
                this.selectAfore(afore.id);
                this.setSidebarOpen(false);
            });
            this.el.sidebarList.appendChild(item);

            // Píldora táctil rápida para móvil
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'rad_mobile_pill';
            pill.dataset.aforeId = afore.id;
            pill.textContent = afore.nombreCorto;
            pill.addEventListener('click', () => this.selectAfore(afore.id));
            this.el.mobileStrip.appendChild(pill);
        }
    }

    bindEvents() {
        this.el.closeBtn.addEventListener('click', () => this.close());
        this.el.menuToggle.addEventListener('click', () => {
            const isOpen = this.el.sidebar.classList.contains('is-open');
            this.setSidebarOpen(!isOpen);
        });
        this.el.sidebarClose.addEventListener('click', () => this.setSidebarOpen(false));
        this.el.sidebarBackdrop.addEventListener('click', () => this.setSidebarOpen(false));

        this.el.tabInteractive.addEventListener('click', () => this.setMode('interactive'));
        this.el.tabPdf.addEventListener('click', () => this.setMode('pdf'));
        this.el.openPdfInline.addEventListener('click', () => this.setMode('pdf'));

        this.el.sortToggle.addEventListener('click', () => {
            this.sortByActions = !this.sortByActions;
            this.el.sortToggle.setAttribute('aria-pressed', String(this.sortByActions));
            this.el.sortToggle.textContent = this.sortByActions
                ? 'Ver orden temático'
                : 'Ordenar por acciones';
            const afore = this.getActiveAfore();
            if (afore) this.renderSubtemas(afore);
        });

        // Teclado: Escape para cerrar, flechas arriba/abajo para cambiar Afore
        document.addEventListener('keydown', (e) => {
            if (this.el.modal.hidden) return;
            if (e.key === 'Escape') {
                if (this.el.sidebar.classList.contains('is-open')) {
                    this.setSidebarOpen(false);
                } else {
                    this.close();
                }
            }
        });

        // Gesto táctil para deslizar y cerrar el menú lateral en móvil
        let touchStartX = 0;
        this.el.sidebar.addEventListener(
            'touchstart',
            (e) => {
                if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
            },
            { passive: true }
        );
        this.el.sidebar.addEventListener(
            'touchend',
            (e) => {
                if (e.changedTouches.length === 1) {
                    const dx = e.changedTouches[0].clientX - touchStartX;
                    if (dx < -60) this.setSidebarOpen(false);
                }
            },
            { passive: true }
        );

        // Soportar botón Atrás del navegador con hash #afore=...
        window.addEventListener('hashchange', () => this.checkInitialHash());
    }

    checkInitialHash() {
        const match = window.location.hash.match(/^#afore=([a-z0-9-]+)$/i);
        if (match) {
            const exists = AFORES_DATA.some((a) => a.id === match[1]);
            if (exists) {
                this.open(match[1], false);
            }
        } else if (!this.el.modal.hidden && this.activeAforeId) {
            this.close(false);
        }
    }

    getActiveAfore() {
        return AFORES_DATA.find((a) => a.id === this.activeAforeId) || null;
    }

    open(aforeId, updateHash = true) {
        this.el.modal.hidden = false;
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
        this.setMode('pdf', false);
        this.selectAfore(aforeId, updateHash);
        this.el.closeBtn.focus();
    }

    close(updateHash = true) {
        this.setSidebarOpen(false);
        this.el.modal.hidden = true;
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        const prevId = this.activeAforeId;
        this.activeAforeId = null;

        if (updateHash && window.location.hash.startsWith('#afore=')) {
            history.replaceState(null, '', '#radiografias');
        }

        if (prevId) {
            const trigger = this.el.grid.querySelector(`[data-afore-id="${prevId}"]`);
            trigger?.focus();
        }
    }

    setSidebarOpen(open) {
        this.el.sidebar.classList.toggle('is-open', open);
        this.el.sidebarBackdrop.hidden = !open;
        this.el.menuToggle.setAttribute('aria-expanded', String(open));
    }

    selectAfore(aforeId, updateHash = true) {
        const afore = AFORES_DATA.find((a) => a.id === aforeId);
        if (!afore) return;

        this.activeAforeId = afore.id;

        if (updateHash) {
            const targetHash = `#afore=${afore.id}`;
            if (window.location.hash !== targetHash) {
                history.replaceState(null, '', targetHash);
            }
        }

        // Actualizar encabezado
        this.el.activeLogo.src = afore.logo;
        this.el.activeLogo.alt = afore.nombre;
        this.el.activeTitle.textContent = afore.nombre;
        this.el.downloadBtn.href = afore.pdf;
        this.el.downloadBtn.setAttribute('download', `radiografia_${afore.id}.pdf`);

        // Marcar activo en menú izquierdo y barra móvil
        this.el.sidebarList.querySelectorAll('.rad_sidebar__item').forEach((btn) => {
            const isActive = btn.dataset.aforeId === afore.id;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            if (isActive) {
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        this.el.mobileStrip.querySelectorAll('.rad_mobile_pill').forEach((pill) => {
            const isActive = pill.dataset.aforeId === afore.id;
            pill.classList.toggle('is-active', isActive);
            if (isActive) {
                pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        });

        // Renderizar datos interactivos
        this.renderInteractiveData(afore);
        this.el.interactiveView.scrollTo({ top: 0, behavior: 'smooth' });

        // Si el usuario está en modo PDF, actualizar el PDF inmediatamente
        if (this.activeMode === 'pdf') {
            this.pdfViewer.load(afore.pdf, `Radiografía oficial · ${afore.nombre}`);
        }
    }

    setMode(mode, shouldLoadPdf = true) {
        if (mode !== 'interactive' && mode !== 'pdf') return;
        this.activeMode = mode;

        const isInteractive = mode === 'interactive';
        this.el.tabInteractive.classList.toggle('is-active', isInteractive);
        this.el.tabInteractive.setAttribute('aria-selected', String(isInteractive));
        this.el.tabPdf.classList.toggle('is-active', !isInteractive);
        this.el.tabPdf.setAttribute('aria-selected', String(!isInteractive));

        this.el.interactiveView.hidden = !isInteractive;
        this.el.pdfView.hidden = isInteractive;

        const afore = this.getActiveAfore();
        if (shouldLoadPdf && !isInteractive && afore) {
            this.pdfViewer.load(afore.pdf, `Radiografía oficial · ${afore.nombre}`);
        }
    }

    renderInteractiveData(afore) {
        const { ficha, ejes, perspectivas } = afore;

        // 1. Ficha técnica (KPIs)
        this.el.kpis.innerHTML = `
            <article class="rad_kpi_card rad_kpi_card--highlight">
                <span class="rad_kpi__label">Acciones validadas</span>
                <strong class="rad_kpi__value">${ficha.totalAcciones.toLocaleString('es-MX')}</strong>
                <span class="rad_kpi__detail">de ${CENSO_CONFIG.totalAccionesSistema.toLocaleString('es-MX')} en el sistema</span>
            </article>
            <article class="rad_kpi_card">
                <span class="rad_kpi__label">Posición en el ranking</span>
                <strong class="rad_kpi__value">No. ${ficha.ranking}</strong>
                <span class="rad_kpi__detail">entre las 10 Afores</span>
            </article>
            <article class="rad_kpi_card">
                <span class="rad_kpi__label">Participación sistémica</span>
                <strong class="rad_kpi__value">${ficha.participacion}%</strong>
                <span class="rad_kpi__detail">del total de acciones CEFP</span>
            </article>
            <article class="rad_kpi_card">
                <span class="rad_kpi__label">Cobertura temática</span>
                <strong class="rad_kpi__value">${ficha.cumplimiento}%</strong>
                <span class="rad_kpi__detail">${ficha.subtemasAtendidos} de ${ficha.totalSubtemas} subtemas atendidos</span>
            </article>
        `;

        // 2. Barra proporcional de los 3 ejes
        const total = Math.max(1, ficha.totalAcciones);
        const segsHtml = ejes
            .map((eje) => {
                const pct = ((eje.total / total) * 100).toFixed(1);
                return `<div class="rad_stacked_seg rad_stacked_seg--${eje.id}" style="width: ${pct}%" title="${eje.nombreCorto}: ${eje.total} acciones (${pct}%)"></div>`;
            })
            .join('');

        const colors = {
            bienestar: '#2ED8A0',
            funcionamiento: '#0D7A66',
            tramites: '#04312A'
        };

        const legendHtml = ejes
            .map((eje) => {
                const pct = Math.round((eje.total / total) * 100);
                return `
                    <span class="rad_legend_item">
                        <span class="rad_legend_dot" style="background:${colors[eje.id]}"></span>
                        <strong>${eje.nombreCorto}:</strong> ${eje.total} (${pct}%)
                    </span>
                `;
            })
            .join('');

        this.el.axesSummary.innerHTML = `
            <div class="rad_stacked_bar">${segsHtml}</div>
            <div class="rad_axes_legend">${legendHtml}</div>
        `;

        // 3. Pestañas de filtro por eje
        this.renderEjeFilters(afore);

        // 4. Lista de subtemas
        this.renderSubtemas(afore);

        // 5. Perspectivas transversales
        const atendidas = PERSPECTIVAS_LISTA.filter((p) => perspectivas[p]).length;
        this.el.perspCount.textContent = `${atendidas} de ${PERSPECTIVAS_LISTA.length} perspectivas atendidas`;

        this.el.perspList.innerHTML = PERSPECTIVAS_LISTA.map((nombre) => {
            const ok = Boolean(perspectivas[nombre]);
            return `
                <div class="rad_persp_item ${ok ? 'is-covered' : 'is-missing'}">
                    <span class="rad_persp_label">${nombre}</span>
                    <span class="rad_persp_badge">${ok ? '✓ Atendida' : '✕ No cubierta'}</span>
                </div>
            `;
        }).join('');
    }

    renderEjeFilters(afore) {
        const filtros = [
            { id: 'todos', label: `Todos (${afore.ficha.totalSubtemas})` },
            ...afore.ejes.map((e) => ({ id: e.id, label: `${e.nombreCorto} (${e.total})` }))
        ];

        this.el.ejeFilters.innerHTML = '';
        for (const f of filtros) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.role = 'tab';
            btn.className = 'rad_filter_tab';
            if (this.activeEje === f.id) btn.classList.add('is-active');
            btn.setAttribute('aria-selected', String(this.activeEje === f.id));
            btn.textContent = f.label;
            btn.addEventListener('click', () => {
                this.activeEje = f.id;
                this.renderEjeFilters(afore);
                this.renderSubtemas(afore);
            });
            this.el.ejeFilters.appendChild(btn);
        }
    }

    renderSubtemas(afore) {
        const selectedEjes =
            this.activeEje === 'todos'
                ? afore.ejes
                : afore.ejes.filter((e) => e.id === this.activeEje);

        const allShown = selectedEjes.flatMap((e) =>
            e.subtemas.map((s) => ({ ...s, ejeNombre: e.nombre }))
        );
        const maxVal = Math.max(1, ...allShown.map((s) => s.acciones));

        if (this.sortByActions) {
            const sorted = [...allShown].sort((a, b) => b.acciones - a.acciones);
            this.el.subtemasList.innerHTML = sorted
                .map((s) => this.renderSubtemaRow(s, maxVal))
                .join('');
            return;
        }

        let html = '';
        for (const eje of selectedEjes) {
            if (this.activeEje === 'todos') {
                html += `<h4 class="rad_eje_group_title">${eje.nombre}</h4>`;
            }
            html += eje.subtemas.map((s) => this.renderSubtemaRow(s, maxVal)).join('');
        }
        this.el.subtemasList.innerHTML = html;
    }

    renderSubtemaRow(subtema, maxVal) {
        const isZero = subtema.acciones === 0;
        const pct = isZero ? 0 : Math.max(3, Math.round((subtema.acciones / maxVal) * 100));
        return `
            <div class="rad_subtema_row ${isZero ? 'is-zero' : ''}">
                <div class="rad_subtema_top">
                    <span class="rad_subtema_name">${subtema.nombre}</span>
                    <span class="rad_subtema_count">${subtema.acciones} ${subtema.acciones === 1 ? 'acción' : 'acciones'}</span>
                </div>
                <div class="rad_bar_track">
                    <div class="rad_bar_fill" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    }
}
