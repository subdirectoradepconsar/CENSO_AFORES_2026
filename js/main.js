import { CENSO_CONFIG } from '../data/afores-data.js';
import { CensoPdfViewer, RadiografiaPdfViewer } from './pdf-viewer.js';
import { RadiografiasExplorer } from './radiografias.js';

document.addEventListener('DOMContentLoaded', () => {
    new CensoPdfViewer({
        pdfUrl: CENSO_CONFIG.pdfGeneral,
        seccionesIndice: CENSO_CONFIG.seccionesIndice
    });

    const radPdfViewer = new RadiografiaPdfViewer();
    new RadiografiasExplorer({ pdfViewer: radPdfViewer });
});
