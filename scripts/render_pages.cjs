const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const WEB_DIR = path.resolve(__dirname, '..');
const PDF_PATH = path.join(WEB_DIR, 'public', 'periodico', 'PERIODICO COLEGIO SANTA ISABEL DE HUNGRIA.pdf');
const OUTPUT_DIR = path.join(WEB_DIR, 'public', 'periodico', 'paginas');
const PDFJS_SCRIPT_PATH = path.join(WEB_DIR, 'node_modules', 'pdfjs-dist', 'build', 'pdf.js');
const PDFJS_WORKER_PATH = path.join(WEB_DIR, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.js');

async function main() {
    console.log('PDF Path:', PDF_PATH);
    console.log('Output Dir:', OUTPUT_DIR);

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const pdfBuffer = fs.readFileSync(PDF_PATH);
    const pdfBase64 = pdfBuffer.toString('base64');
    const pdfjsCode = fs.readFileSync(PDFJS_SCRIPT_PATH, 'utf-8');
    const workerBase64 = fs.readFileSync(PDFJS_WORKER_PATH).toString('base64');

    console.log('Launching Edge...');
    const browser = await puppeteer.launch({
        executablePath: EDGE_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1800 });

    await page.setContent(`
        <!DOCTYPE html>
        <html>
        <head>
            <script>${pdfjsCode}</script>
        </head>
        <body style="margin:0; background:transparent;">
            <canvas id="the-canvas" style="display:none;"></canvas>
            <script>
                pdfjsLib.GlobalWorkerOptions.workerSrc = "data:text/javascript;base64,${workerBase64}";

                const pdfData = atob("${pdfBase64}");
                const rawLength = pdfData.length;
                const array = new Uint8Array(new ArrayBuffer(rawLength));
                for(let i = 0; i < rawLength; i++) {
                    array[i] = pdfData.charCodeAt(i);
                }

                window.initPDF = async function() {
                    window.pdfDoc = await pdfjsLib.getDocument({ data: array }).promise;
                    return { numPages: window.pdfDoc.numPages };
                };

                window.renderPage = async function(pageNum, scale = 1.6) {
                    const page = await window.pdfDoc.getPage(pageNum);
                    const viewport = page.getViewport({ scale });
                    const canvas = document.getElementById('the-canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const ctx = canvas.getContext('2d');
                    await page.render({ canvasContext: ctx, viewport }).promise;
                    return {
                        dataUrl: canvas.toDataURL('image/jpeg', 0.88),
                        width: viewport.width,
                        height: viewport.height
                    };
                };
            </script>
        </body>
        </html>
    `, { waitUntil: 'load' });

    console.log('Inicializando PDF en el navegador...');
    const info = await page.evaluate(() => window.initPDF());
    console.log(`Documento listo con ${info.numPages} páginas. Renderizando en alta resolución...`);

    const pagesList = [];
    let baseWidth = 0;
    let baseHeight = 0;

    for (let p = 1; p <= info.numPages; p++) {
        const start = Date.now();
        const res = await page.evaluate((n) => window.renderPage(n), p);
        const base64Data = res.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
        const filename = `pagina_${String(p).padStart(2, '0')}.jpg`;
        const filePath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

        if (p === 1) {
            baseWidth = res.width;
            baseHeight = res.height;
        }

        pagesList.push({
            page: p,
            file: `/periodico/paginas/${filename}`,
            width: res.width,
            height: res.height
        });

        console.log(`[${p}/${info.numPages}] Guardada ${filename} (${res.width}x${res.height}) en ${Date.now() - start}ms`);
    }

    const manifest = {
        title: 'Periódico Escolar Colegio Santa Isabel de Hungría',
        totalPages: info.numPages,
        baseWidth,
        baseHeight,
        aspectRatio: Number((baseWidth / baseHeight).toFixed(4)),
        pages: pagesList
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'manifest.json'),
        JSON.stringify(manifest, null, 2),
        'utf-8'
    );

    console.log('Manifest guardado con éxito. Cerrando navegador...');
    await browser.close();
    console.log('¡Proceso completado exitosamente!');
}

main().catch(err => {
    console.error('Error al renderizar páginas:', err);
    process.exit(1);
});
