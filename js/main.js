import { CENSO_CONFIG } from '../data/afores-data.js?v=2025';
import { CensoPdfViewer, RadiografiaPdfViewer } from './pdf-viewer.js?v=2025';
import { RadiografiasExplorer } from './radiografias.js?v=2025';

document.addEventListener('DOMContentLoaded', () => {
    new CensoPdfViewer({
        pdfUrl: CENSO_CONFIG.pdfGeneral,
        seccionesIndice: CENSO_CONFIG.seccionesIndice
    });

    const radPdfViewer = new RadiografiaPdfViewer();
    new RadiografiasExplorer({ pdfViewer: radPdfViewer });
});
