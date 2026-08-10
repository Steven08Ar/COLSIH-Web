/**
 * @file normalizeDocument.test.js
 * Tests unitarios para normalizeDocument() y sus helpers.
 * Runner: Vitest (npm run test:run)
 *
 * Los UUIDs generados para bloques sin ID son no-deterministas.
 * Los tests verifican FORMA (estructura, tipos, presencia) no valores específicos de UUID.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    normalizeDocument,
    getChildren,
    getNodeById,
    buildNodeMap,
    resolveStyles,
} from './normalizeDocument.js';

// ─── Mock de uuid para que los tests sean deterministas ───────────────────────
// Cada llamada a uuidv4() produce un ID único y predecible dentro del test.
let uuidCounter = 0;
vi.mock('uuid', () => ({
    v4: () => `generated-uuid-${++uuidCounter}`,
}));

beforeEach(() => {
    uuidCounter = 0;
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. Documento vacío
// ─────────────────────────────────────────────────────────────────────────────
describe('documento vacío', () => {
    it('null produce documento v2 vacío', () => {
        const doc = normalizeDocument(null);
        expect(doc.version).toBe(2);
        expect(doc.id).toBe('page_root');
        expect(doc.type).toBe('page');
        expect(doc.nodes).toEqual([]);
    });

    it('undefined produce documento v2 vacío', () => {
        const doc = normalizeDocument(undefined);
        expect(doc.version).toBe(2);
        expect(doc.nodes).toEqual([]);
    });

    it('array vacío produce documento v2 vacío', () => {
        const doc = normalizeDocument([]);
        expect(doc.version).toBe(2);
        expect(doc.nodes).toEqual([]);
    });

    it('string vacío produce documento v2 vacío', () => {
        const doc = normalizeDocument('');
        expect(doc.version).toBe(2);
        expect(doc.nodes).toEqual([]);
    });

    it('número produce documento v2 vacío', () => {
        const doc = normalizeDocument(42);
        expect(doc.version).toBe(2);
        expect(doc.nodes).toEqual([]);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Documento V1 válido (array con bloques básicos)
// ─────────────────────────────────────────────────────────────────────────────
describe('documento V1 válido', () => {
    const v1 = [
        {
            id:       'block_abc123',
            tipo:     'texto',
            width:    'completo',
            contenido: 'Primer párrafo de la noticia.',
            styles:   {},
        },
        {
            id:       'block_def456',
            tipo:     'titulo',
            width:    'completo',
            contenido: 'Un título de sección',
            styles:   {},
        },
    ];

    it('produce un documento v2 con version: 2', () => {
        const doc = normalizeDocument(v1);
        expect(doc.version).toBe(2);
    });

    it('produce el número correcto de nodos', () => {
        const doc = normalizeDocument(v1);
        expect(doc.nodes).toHaveLength(2);
    });

    it('preserva los IDs existentes', () => {
        const doc = normalizeDocument(v1);
        expect(doc.nodes[0].id).toBe('block_abc123');
        expect(doc.nodes[1].id).toBe('block_def456');
    });

    it('cada nodo tiene estructura canónica completa', () => {
        const doc = normalizeDocument(v1);
        const node = doc.nodes[0];
        expect(node).toHaveProperty('id');
        expect(node).toHaveProperty('type');
        expect(node).toHaveProperty('parentId');
        expect(node).toHaveProperty('order');
        expect(node).toHaveProperty('props');
        expect(node).toHaveProperty('styles');
        expect(node).toHaveProperty('layout');
        expect(node).toHaveProperty('locked');
        expect(node).toHaveProperty('hidden');
    });

    it('nodo de tipo texto tiene props.text correctamente mapeado desde contenido', () => {
        const doc = normalizeDocument(v1);
        expect(doc.nodes[0].type).toBe('texto');
        expect(doc.nodes[0].props.text).toBe('Primer párrafo de la noticia.');
    });

    it('nodo de tipo titulo tiene props.text y props.level', () => {
        const doc = normalizeDocument(v1);
        expect(doc.nodes[1].type).toBe('titulo');
        expect(doc.nodes[1].props.text).toBe('Un título de sección');
        expect(doc.nodes[1].props.level).toBe('h3');
    });

    it('parentId es null para nodos hijos directos de la página', () => {
        const doc = normalizeDocument(v1);
        expect(doc.nodes[0].parentId).toBeNull();
        expect(doc.nodes[1].parentId).toBeNull();
    });

    it('order refleja la posición en el array original', () => {
        const doc = normalizeDocument(v1);
        expect(doc.nodes[0].order).toBe(0);
        expect(doc.nodes[1].order).toBe(1);
    });

    it('width: completo → columnSpan: 12', () => {
        const doc = normalizeDocument(v1);
        expect(doc.nodes[0].layout.columnSpan).toBe(12);
    });

    it('width: estrecho → columnSpan: 4', () => {
        const doc = normalizeDocument([{ id: 'b1', tipo: 'texto', width: 'estrecho', contenido: '' }]);
        expect(doc.nodes[0].layout.columnSpan).toBe(4);
    });

    it('width: mediano → columnSpan: 6', () => {
        const doc = normalizeDocument([{ id: 'b1', tipo: 'texto', width: 'mediano', contenido: '' }]);
        expect(doc.nodes[0].layout.columnSpan).toBe(6);
    });

    it('locked y hidden son false por defecto', () => {
        const doc = normalizeDocument(v1);
        expect(doc.nodes[0].locked).toBe(false);
        expect(doc.nodes[0].hidden).toBe(false);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Documento V1 con styles legacy (CSS values en objeto plano)
// ─────────────────────────────────────────────────────────────────────────────
describe('documento V1 con styles legacy (CSS values planos)', () => {
    const v1ConStyles = [
        {
            id:       'block_s01',
            tipo:     'texto',
            width:    'completo',
            contenido: 'Texto con estilos CSS.',
            styles: {
                fontSize:       '24px',
                fontWeight:     '700',
                fontStyle:      'italic',
                textDecoration: 'underline',
                align:          'center',
                textColor:      '#800A15',
            },
        },
    ];

    it('convierte CSS values a estructura responsive { desktop, tablet, mobile }', () => {
        const doc = normalizeDocument(v1ConStyles);
        const styles = doc.nodes[0].styles;
        expect(styles).toHaveProperty('desktop');
        expect(styles).toHaveProperty('tablet');
        expect(styles).toHaveProperty('mobile');
    });

    it('preserva fontSize CSS directamente', () => {
        const doc = normalizeDocument(v1ConStyles);
        expect(doc.nodes[0].styles.desktop.fontSize).toBe('24px');
    });

    it('preserva fontWeight CSS directamente', () => {
        const doc = normalizeDocument(v1ConStyles);
        expect(doc.nodes[0].styles.desktop.fontWeight).toBe('700');
    });

    it('preserva fontStyle CSS directamente', () => {
        const doc = normalizeDocument(v1ConStyles);
        expect(doc.nodes[0].styles.desktop.fontStyle).toBe('italic');
    });

    it('preserva textDecoration CSS directamente', () => {
        const doc = normalizeDocument(v1ConStyles);
        expect(doc.nodes[0].styles.desktop.textDecoration).toBe('underline');
    });

    it('renombra align → textAlign', () => {
        const doc = normalizeDocument(v1ConStyles);
        expect(doc.nodes[0].styles.desktop.textAlign).toBe('center');
        expect(doc.nodes[0].styles.desktop.align).toBeUndefined();
    });

    it('renombra textColor → color', () => {
        const doc = normalizeDocument(v1ConStyles);
        expect(doc.nodes[0].styles.desktop.color).toBe('#800A15');
        expect(doc.nodes[0].styles.desktop.textColor).toBeUndefined();
    });

    it('tablet y mobile son objetos vacíos (sin overrides)', () => {
        const doc = normalizeDocument(v1ConStyles);
        expect(doc.nodes[0].styles.tablet).toEqual({});
        expect(doc.nodes[0].styles.mobile).toEqual({});
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. Documento V1 con formato legacy (objeto formato semántico)
// ─────────────────────────────────────────────────────────────────────────────
describe('documento V1 con formato legacy', () => {
    const v1ConFormato = [
        {
            id:       'block_f01',
            tipo:     'texto',
            width:    'completo',
            contenido: 'Texto con formato legacy.',
            formato: {
                size:      'muy-grande',
                bold:      true,
                italic:    true,
                underline: false,
                color:     'rojo',
            },
        },
    ];

    it('convierte size: muy-grande → fontSize: 28px', () => {
        const doc = normalizeDocument(v1ConFormato);
        expect(doc.nodes[0].styles.desktop.fontSize).toBe('28px');
    });

    it('convierte size: grande → fontSize: 20px', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'texto', width: 'completo', contenido: '',
            formato: { size: 'grande' },
        }]);
        expect(doc.nodes[0].styles.desktop.fontSize).toBe('20px');
    });

    it('convierte bold: true → fontWeight: 700', () => {
        const doc = normalizeDocument(v1ConFormato);
        expect(doc.nodes[0].styles.desktop.fontWeight).toBe('700');
    });

    it('convierte italic: true → fontStyle: italic', () => {
        const doc = normalizeDocument(v1ConFormato);
        expect(doc.nodes[0].styles.desktop.fontStyle).toBe('italic');
    });

    it('convierte color: rojo → color: #800A15', () => {
        const doc = normalizeDocument(v1ConFormato);
        expect(doc.nodes[0].styles.desktop.color).toBe('#800A15');
    });

    it('convierte color: azul → color: #003C8F', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'texto', width: 'completo', contenido: '',
            formato: { color: 'azul' },
        }]);
        expect(doc.nodes[0].styles.desktop.color).toBe('#003C8F');
    });

    it('styles.textColor tiene precedencia sobre formato.color', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'texto', width: 'completo', contenido: '',
            styles: { textColor: '#AABBCC' },
            formato: { color: 'rojo' },
        }]);
        expect(doc.nodes[0].styles.desktop.color).toBe('#AABBCC');
    });

    it('styles.fontSize tiene precedencia sobre formato.size', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'texto', width: 'completo', contenido: '',
            styles: { fontSize: '24px' },
            formato: { size: 'muy-grande' },
        }]);
        expect(doc.nodes[0].styles.desktop.fontSize).toBe('24px');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. Conversión de Tailwind a CSS en styles
// ─────────────────────────────────────────────────────────────────────────────
describe('conversión Tailwind → CSS en styles', () => {
    function blockWithStyles(styles) {
        return [{ id: 'b1', tipo: 'texto', width: 'completo', contenido: '', styles }];
    }

    it('bgGradient: "from-blue-50 to-indigo-50" → backgroundImage CSS', () => {
        const doc = normalizeDocument(blockWithStyles({ bgGradient: 'from-blue-50 to-indigo-50' }));
        expect(doc.nodes[0].styles.desktop.backgroundImage).toBe('linear-gradient(135deg, #EFF6FF, #EEF2FF)');
    });

    it('bgGradient: "from-amber-50 to-orange-50" → backgroundImage CSS', () => {
        const doc = normalizeDocument(blockWithStyles({ bgGradient: 'from-amber-50 to-orange-50' }));
        expect(doc.nodes[0].styles.desktop.backgroundImage).toBe('linear-gradient(135deg, #FFFBEB, #FFF7ED)');
    });

    it('bgGradient: "" (vacío) → backgroundImage undefined', () => {
        const doc = normalizeDocument(blockWithStyles({ bgGradient: '' }));
        expect(doc.nodes[0].styles.desktop.backgroundImage).toBeUndefined();
    });

    it('padding: "p-8" → paddingTop/Right/Bottom/Left: 32px', () => {
        const doc = normalizeDocument(blockWithStyles({ padding: 'p-8' }));
        const d = doc.nodes[0].styles.desktop;
        expect(d.paddingTop).toBe('32px');
        expect(d.paddingRight).toBe('32px');
        expect(d.paddingBottom).toBe('32px');
        expect(d.paddingLeft).toBe('32px');
    });

    it('padding: "py-20 px-12" → padding asimétrico', () => {
        const doc = normalizeDocument(blockWithStyles({ padding: 'py-20 px-12' }));
        const d = doc.nodes[0].styles.desktop;
        expect(d.paddingTop).toBe('80px');
        expect(d.paddingRight).toBe('48px');
        expect(d.paddingBottom).toBe('80px');
        expect(d.paddingLeft).toBe('48px');
    });

    it('margin: "my-4" → marginTop/Bottom: 16px', () => {
        const doc = normalizeDocument(blockWithStyles({ margin: 'my-4' }));
        const d = doc.nodes[0].styles.desktop;
        expect(d.marginTop).toBe('16px');
        expect(d.marginBottom).toBe('16px');
    });

    it('borderRadius: "rounded-2xl" → 16px', () => {
        const doc = normalizeDocument(blockWithStyles({ borderRadius: 'rounded-2xl' }));
        expect(doc.nodes[0].styles.desktop.borderRadius).toBe('16px');
    });

    it('borderRadius: "rounded-none" → 0', () => {
        const doc = normalizeDocument(blockWithStyles({ borderRadius: 'rounded-none' }));
        expect(doc.nodes[0].styles.desktop.borderRadius).toBe('0');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Bloques sin ID
// ─────────────────────────────────────────────────────────────────────────────
describe('bloques sin ID', () => {
    it('genera un ID cuando id es undefined', () => {
        const doc = normalizeDocument([{ tipo: 'texto', width: 'completo', contenido: 'hola' }]);
        expect(typeof doc.nodes[0].id).toBe('string');
        expect(doc.nodes[0].id.length).toBeGreaterThan(0);
    });

    it('genera un ID cuando id es null', () => {
        const doc = normalizeDocument([{ id: null, tipo: 'texto', contenido: '' }]);
        expect(typeof doc.nodes[0].id).toBe('string');
        expect(doc.nodes[0].id).toBeTruthy();
    });

    it('genera un ID cuando id es string vacío', () => {
        const doc = normalizeDocument([{ id: '', tipo: 'texto', contenido: '' }]);
        expect(doc.nodes[0].id).toBeTruthy();
        expect(doc.nodes[0].id).not.toBe('');
    });

    it('genera IDs distintos para múltiples bloques sin ID', () => {
        const doc = normalizeDocument([
            { tipo: 'texto', contenido: 'A' },
            { tipo: 'texto', contenido: 'B' },
        ]);
        expect(doc.nodes[0].id).not.toBe(doc.nodes[1].id);
    });

    it('preserva IDs existentes válidos', () => {
        const doc = normalizeDocument([{ id: 'block_abc', tipo: 'texto', contenido: '' }]);
        expect(doc.nodes[0].id).toBe('block_abc');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Bloques de imagen
// ─────────────────────────────────────────────────────────────────────────────
describe('bloques de imagen', () => {
    const imagenLegacy = [
        {
            id:     'block_img01',
            tipo:   'imagen',
            width:  'completo',
            imagen: 'noticias/articulos/foto-grados-2026.jpg',
            leyenda: 'Ceremonia de grados 2026',
        },
    ];

    it('mapea imagen → props.dbPath', () => {
        const doc = normalizeDocument(imagenLegacy);
        expect(doc.nodes[0].props.dbPath).toBe('noticias/articulos/foto-grados-2026.jpg');
    });

    it('mapea leyenda → props.caption', () => {
        const doc = normalizeDocument(imagenLegacy);
        expect(doc.nodes[0].props.caption).toBe('Ceremonia de grados 2026');
    });

    it('NO incluye props.url (la URL se deriva en render con mediaUrl())', () => {
        const doc = normalizeDocument(imagenLegacy);
        expect(doc.nodes[0].props.url).toBeUndefined();
    });

    it('imagen sin ruta → dbPath y caption vacíos', () => {
        const doc = normalizeDocument([{ id: 'b1', tipo: 'imagen', width: 'completo' }]);
        expect(doc.nodes[0].props.dbPath).toBe('');
        expect(doc.nodes[0].props.caption).toBe('');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Tipos conocidos — mapeo completo de props
// ─────────────────────────────────────────────────────────────────────────────
describe('mapeo de props por tipo de bloque', () => {
    it('cita: mapea contenido→quote, autor→author', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'cita', width: 'completo',
            contenido: 'La educación es el arma más poderosa.',
            autor: 'Nelson Mandela',
        }]);
        expect(doc.nodes[0].props.quote).toBe('La educación es el arma más poderosa.');
        expect(doc.nodes[0].props.author).toBe('Nelson Mandela');
    });

    it('video: mapea url, titulo, videoFile', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'video', width: 'completo',
            url:       'https://youtu.be/dQw4w9WgXcQ',
            titulo:    'Acto de grados',
            videoFile: 'noticias/videos/acto.mp4',
        }]);
        expect(doc.nodes[0].props.url).toBe('https://youtu.be/dQw4w9WgXcQ');
        expect(doc.nodes[0].props.title).toBe('Acto de grados');
        expect(doc.nodes[0].props.videoFile).toBe('noticias/videos/acto.mp4');
    });

    it('ficha: mapea titulo, items', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'ficha', width: 'completo',
            titulo: 'Datos del evento',
            items:  'Fecha: 15 agosto\nLugar: Auditorio',
        }]);
        expect(doc.nodes[0].props.title).toBe('Datos del evento');
        expect(doc.nodes[0].props.items).toBe('Fecha: 15 agosto\nLugar: Auditorio');
    });

    it('separador: extrae separatorStyle desde styles a props', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'separador', width: 'completo',
            styles: { separatorStyle: 'simple' },
        }]);
        expect(doc.nodes[0].props.separatorStyle).toBe('simple');
    });

    it('separador: separatorStyle por defecto es "punto"', () => {
        const doc = normalizeDocument([{ id: 'b1', tipo: 'separador', width: 'completo' }]);
        expect(doc.nodes[0].props.separatorStyle).toBe('punto');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. Tipos desconocidos o sin implementar
// ─────────────────────────────────────────────────────────────────────────────
describe('tipos desconocidos', () => {
    it('tipo galeria (sin implementar) produce nodo con type correcto', () => {
        const doc = normalizeDocument([{ id: 'b1', tipo: 'galeria', width: 'completo' }]);
        expect(doc.nodes[0].type).toBe('galeria');
    });

    it('tipo desconocido no lanza error', () => {
        expect(() => normalizeDocument([{
            id: 'b1', tipo: 'tipo-que-no-existe', width: 'completo',
        }])).not.toThrow();
    });

    it('tipo desconocido con content preserva los datos', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'mapa', width: 'completo',
            content: { lat: 4.71, lng: -74.07, zoom: 15 },
        }]);
        expect(doc.nodes[0].props.lat).toBe(4.71);
        expect(doc.nodes[0].props.lng).toBe(-74.07);
    });

    it('tipo desconocido con contenido preserva texto', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'html', width: 'completo',
            contenido: '<p>HTML personalizado</p>',
        }]);
        expect(doc.nodes[0].props.text).toBe('<p>HTML personalizado</p>');
    });

    it('bloque null en el array es omitido', () => {
        const doc = normalizeDocument([
            { id: 'b1', tipo: 'texto', contenido: 'ok' },
            null,
            { id: 'b2', tipo: 'titulo', contenido: 'ok' },
        ]);
        expect(doc.nodes).toHaveLength(2);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. Documento ya en V2
// ─────────────────────────────────────────────────────────────────────────────
describe('documento ya V2', () => {
    const docV2 = {
        version: 2,
        id:      'page_root',
        type:    'page',
        nodes: [
            {
                id:       'node-uuid-001',
                type:     'texto',
                parentId: null,
                order:    0,
                props:    { text: 'Contenido canónico.' },
                styles:   {
                    desktop: { fontSize: '16px', color: '#475569' },
                    tablet:  {},
                    mobile:  {},
                },
                layout:  { columnSpan: 12 },
                locked:  false,
                hidden:  false,
            },
        ],
    };

    it('preserva version: 2', () => {
        const doc = normalizeDocument(docV2);
        expect(doc.version).toBe(2);
    });

    it('preserva IDs de nodos', () => {
        const doc = normalizeDocument(docV2);
        expect(doc.nodes[0].id).toBe('node-uuid-001');
    });

    it('preserva props canónicas sin transformar', () => {
        const doc = normalizeDocument(docV2);
        expect(doc.nodes[0].props.text).toBe('Contenido canónico.');
    });

    it('preserva styles responsive sin transformar', () => {
        const doc = normalizeDocument(docV2);
        expect(doc.nodes[0].styles.desktop.fontSize).toBe('16px');
        expect(doc.nodes[0].styles.desktop.color).toBe('#475569');
        expect(doc.nodes[0].styles.tablet).toEqual({});
    });

    it('NO genera nuevos IDs para nodos que ya tienen ID', () => {
        const doc = normalizeDocument(docV2);
        expect(uuidCounter).toBe(0);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 11. Documento parcialmente V2 (version: 2 pero nodos con flat styles)
// ─────────────────────────────────────────────────────────────────────────────
describe('documento parcialmente V2', () => {
    const docParcialV2 = {
        version: 2,
        id:      'page_root',
        type:    'page',
        nodes: [
            {
                id:       'node-partial-01',
                type:     'texto',
                parentId: null,
                order:    0,
                props:    { text: 'Nodo con props canónicas.' },
                // styles planos — no tienen estructura responsive todavía
                styles: {
                    fontSize:  '18px',
                    textColor: '#334155',
                    align:     'center',
                },
                layout:  { columnSpan: 12 },
                locked:  false,
                hidden:  false,
            },
        ],
    };

    it('normaliza flat styles a estructura responsive', () => {
        const doc = normalizeDocument(docParcialV2);
        const styles = doc.nodes[0].styles;
        expect(styles).toHaveProperty('desktop');
        expect(styles).toHaveProperty('tablet');
        expect(styles).toHaveProperty('mobile');
    });

    it('preserva props canónicas del nodo', () => {
        const doc = normalizeDocument(docParcialV2);
        expect(doc.nodes[0].props.text).toBe('Nodo con props canónicas.');
    });

    it('convierte textColor → color en nodo parcialmente v2', () => {
        const doc = normalizeDocument(docParcialV2);
        expect(doc.nodes[0].styles.desktop.color).toBe('#334155');
    });

    it('convierte align → textAlign en nodo parcialmente v2', () => {
        const doc = normalizeDocument(docParcialV2);
        expect(doc.nodes[0].styles.desktop.textAlign).toBe('center');
        expect(doc.nodes[0].styles.desktop.align).toBeUndefined();
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 12. Valores inválidos en campos individuales
// ─────────────────────────────────────────────────────────────────────────────
describe('valores inválidos en campos', () => {
    it('bgGradient desconocido → backgroundImage undefined', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'texto', width: 'completo', contenido: '',
            styles: { bgGradient: 'from-verde-extremo to-morado-imposible' },
        }]);
        expect(doc.nodes[0].styles.desktop.backgroundImage).toBeUndefined();
    });

    it('padding desconocido → sin paddingTop', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'texto', width: 'completo', contenido: '',
            styles: { padding: 'p-999' },
        }]);
        expect(doc.nodes[0].styles.desktop.paddingTop).toBeUndefined();
    });

    it('borderRadius desconocida → borderRadius undefined', () => {
        const doc = normalizeDocument([{
            id: 'b1', tipo: 'texto', width: 'completo', contenido: '',
            styles: { borderRadius: 'rounded-extragrande' },
        }]);
        expect(doc.nodes[0].styles.desktop.borderRadius).toBeUndefined();
    });

    it('objeto con fields extras no falla', () => {
        expect(() => normalizeDocument([{
            id: 'b1', tipo: 'texto', contenido: '',
            campoExtra: 'valor',
            _key: 'legacy-key-para-imagen',
            _pendingFile: 'algún file',
        }])).not.toThrow();
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Helper: getChildren
// ─────────────────────────────────────────────────────────────────────────────
describe('getChildren', () => {
    // El nodo raíz (page_root) NO aparece en nodes[] — es el documento en sí.
    // Los nodos con parentId: null son hijos directos de la página.
    const nodes = [
        { id: 'n1',   type: 'texto',   parentId: null,   order: 2 },
        { id: 'n2',   type: 'titulo',  parentId: null,   order: 0 },
        { id: 'n3',   type: 'imagen',  parentId: 'sec1', order: 0 },
    ];

    it('devuelve hijos directos de la página (parentId: null)', () => {
        const children = getChildren(nodes, null);
        expect(children).toHaveLength(2);
        expect(children.map(n => n.id)).toContain('n1');
        expect(children.map(n => n.id)).toContain('n2');
    });

    it('ordena hijos por order ASC', () => {
        const children = getChildren(nodes, null);
        expect(children[0].id).toBe('n2'); // order: 0
        expect(children[1].id).toBe('n1'); // order: 2
    });

    it('devuelve hijos de un nodo específico', () => {
        const children = getChildren(nodes, 'sec1');
        expect(children).toHaveLength(1);
        expect(children[0].id).toBe('n3');
    });

    it('devuelve array vacío si no hay hijos', () => {
        const children = getChildren(nodes, 'nodo-inexistente');
        expect(children).toEqual([]);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Helper: resolveStyles
// ─────────────────────────────────────────────────────────────────────────────
describe('resolveStyles', () => {
    const responsive = {
        desktop: { fontSize: '16px', color: '#475569', fontWeight: '400' },
        tablet:  { fontSize: '15px' },
        mobile:  { fontSize: '14px', color: '#1e293b' },
    };

    it('desktop devuelve solo los estilos base', () => {
        const resolved = resolveStyles(responsive, 'desktop');
        expect(resolved.fontSize).toBe('16px');
        expect(resolved.color).toBe('#475569');
        expect(resolved.fontWeight).toBe('400');
    });

    it('tablet aplica overrides sobre desktop (hereda fontWeight)', () => {
        const resolved = resolveStyles(responsive, 'tablet');
        expect(resolved.fontSize).toBe('15px');     // override
        expect(resolved.color).toBe('#475569');     // heredado
        expect(resolved.fontWeight).toBe('400');    // heredado
    });

    it('mobile aplica overrides sobre tablet+desktop', () => {
        const resolved = resolveStyles(responsive, 'mobile');
        expect(resolved.fontSize).toBe('14px');     // override mobile
        expect(resolved.color).toBe('#1e293b');     // override mobile
        expect(resolved.fontWeight).toBe('400');    // heredado de desktop
    });

    it('maneja estilos sin tablet/mobile (todo vacío)', () => {
        const simple = { desktop: { fontSize: '18px' }, tablet: {}, mobile: {} };
        expect(resolveStyles(simple, 'mobile').fontSize).toBe('18px');
    });

    it('maneja objeto undefined', () => {
        const resolved = resolveStyles(undefined, 'desktop');
        expect(resolved).toEqual({});
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Helper: buildNodeMap
// ─────────────────────────────────────────────────────────────────────────────
describe('buildNodeMap', () => {
    const nodes = [
        { id: 'a1', type: 'texto' },
        { id: 'b2', type: 'imagen' },
    ];

    it('construye un Map con los nodos', () => {
        const map = buildNodeMap(nodes);
        expect(map.size).toBe(2);
        expect(map.get('a1').type).toBe('texto');
        expect(map.get('b2').type).toBe('imagen');
    });

    it('devuelve undefined para IDs inexistentes', () => {
        const map = buildNodeMap(nodes);
        expect(map.get('no-existe')).toBeUndefined();
    });
});
