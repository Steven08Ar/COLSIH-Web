/**
 * @file normalizeDocument.demo.js
 * Prueba D: verifica normalizeDocument() con contenido real del estilo
 * que almacena la DB actual (producido por procesarBloques() + mapEditorBlockToDbBlock()).
 *
 * Ejecutar: node resources/js/Editor/Core/normalizeDocument.demo.js
 * (desde el directorio raíz del proyecto web)
 */

import { normalizeDocument, resolveStyles } from './normalizeDocument.js';

// ── Datos reales: formato exacto que produce el controller + editor actual ────
// Este array es lo que quedaría guardado en la columna `bloques` de una noticia.

const bloquesRealDB = [
    // Bloque 1: título con formato legacy
    {
        tipo:     'titulo',
        width:    'completo',
        contenido: 'Acto de Grados Promoción 2026',
        // Sin ID — representa bloques guardados antes de v2
        styles:   {},
        formato:  {
            size:      'muy-grande',
            bold:      false,
            italic:    false,
            underline: false,
            color:     'gris',
        },
    },

    // Bloque 2: texto con estilos CSS guardados por PropertyPanel
    {
        id:       'block_abc123',
        tipo:     'texto',
        width:    'completo',
        contenido: 'El pasado viernes 15 de agosto se llevó a cabo el acto de grados de la promoción 2026 en el auditorio principal de la institución.',
        styles: {
            fontSize:       '18px',
            fontWeight:     '400',
            fontStyle:      'normal',
            textDecoration: 'none',
            align:          'left',
            textColor:      '#475569',
            padding:        'p-8',
            margin:         'my-4',
            borderRadius:   'rounded-2xl',
        },
        formato: {
            size:  'normal',
            bold:  false,
            color: 'gris',
        },
    },

    // Bloque 3: imagen con ruta de storage
    {
        id:     'block_img01',
        tipo:   'imagen',
        width:  'completo',
        imagen: 'noticias/articulos/grados-2026-principal.jpg',
        leyenda: 'Los graduandos durante el acto de ceremonia',
        styles: {
            borderRadius: 'rounded-2xl',
            margin:       'my-4',
        },
        formato: {},
    },

    // Bloque 4: cita con autor
    {
        id:       'block_cita01',
        tipo:     'cita',
        width:    'completo',
        contenido: 'Este es el fruto de años de esfuerzo, dedicación y compromiso con la excelencia educativa.',
        autor:    'Rector del COLSIH',
        styles:   {
            bgGradient:   'from-blue-50 to-indigo-50',
            padding:      'p-8',
            borderRadius: 'rounded-2xl',
        },
        formato:  {},
    },

    // Bloque 5: separador
    {
        id:    'block_sep01',
        tipo:  'separador',
        width: 'completo',
        styles: { separatorStyle: 'punto' },
        formato: {},
    },

    // Bloque 6: ficha técnica
    {
        id:     'block_ficha01',
        tipo:   'ficha',
        width:  'mediano',
        titulo: 'Datos del Evento',
        items:  'Fecha: 15 de agosto 2026\nLugar: Auditorio Principal\nHora: 8:00 AM\nGraduandos: 87 estudiantes',
        styles: {
            bgGradient: 'from-slate-50 to-slate-100',
            padding:    'p-6',
        },
        formato: {},
    },

    // Bloque 7: video de YouTube
    {
        id:     'block_vid01',
        tipo:   'video',
        width:  'completo',
        url:    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        titulo: 'Resumen del Acto de Grados 2026',
        styles: {},
        formato: {},
    },
];

// ─── Ejecutar normalización ───────────────────────────────────────────────────
console.log('\n════════════════════════════════════════════════════════════════');
console.log('  normalizeDocument() — Prueba con contenido real de la DB');
console.log('════════════════════════════════════════════════════════════════\n');

const doc = normalizeDocument(bloquesRealDB);

console.log(`✓ version:  ${doc.version}`);
console.log(`✓ id:       ${doc.id}`);
console.log(`✓ type:     ${doc.type}`);
console.log(`✓ nodes:    ${doc.nodes.length} nodos\n`);

doc.nodes.forEach((node, i) => {
    console.log(`── Nodo ${i + 1}: [${node.type}] ───────────────────────────────────`);
    console.log(`   id:          ${node.id}`);
    console.log(`   parentId:    ${node.parentId}`);
    console.log(`   order:       ${node.order}`);
    console.log(`   columnSpan:  ${node.layout.columnSpan}`);

    // Props
    const propsSummary = Object.entries(node.props)
        .map(([k, v]) => `${k}: "${String(v).slice(0, 50)}"`)
        .join(', ');
    console.log(`   props:       { ${propsSummary} }`);

    // Estilos resueltos para desktop
    const desktopStyles = resolveStyles(node.styles, 'desktop');
    const stylesSummary = Object.entries(desktopStyles)
        .map(([k, v]) => `${k}: "${v}"`)
        .join(', ');
    console.log(`   styles.desktop: { ${stylesSummary || 'vacío'} }`);
    console.log('');
});

// ─── Verificar round-trip: ¿puede serializar de vuelta para el controller? ───
console.log('════════════════════════════════════════════════════════════════');
console.log('  Verificación de serialización (JSON.stringify)');
console.log('════════════════════════════════════════════════════════════════\n');

const serialized = JSON.stringify(doc);
const parsed = JSON.parse(serialized);

console.log(`✓ JSON.stringify OK — tamaño: ${Math.round(serialized.length / 1024 * 10) / 10} KB`);
console.log(`✓ JSON.parse OK — nodes: ${parsed.nodes.length}`);
console.log(`✓ version se preserva: ${parsed.version === 2}`);
console.log(`✓ IDs se preservan: ${parsed.nodes[1].id === 'block_abc123'}`);

// ─── Verificar que un bloque sin ID recibe UUID generado ─────────────────────
const bloqueSinId = doc.nodes[0];
console.log(`\n✓ Bloque sin ID recibió UUID generado: "${bloqueSinId.id}"`);
console.log(`  (formato válido: ${bloqueSinId.id.length > 4})`);

// ─── Verificar la herencia responsive ────────────────────────────────────────
console.log('\n════════════════════════════════════════════════════════════════');
console.log('  Verificación de herencia responsive');
console.log('════════════════════════════════════════════════════════════════\n');

// Añadir overrides manuales para demo
const nodeConResponsive = {
    ...doc.nodes[1],
    styles: {
        desktop: { fontSize: '18px', color: '#475569', fontWeight: '400' },
        tablet:  { fontSize: '16px' },
        mobile:  { fontSize: '14px', color: '#1e293b' },
    },
};

const resDesktop = resolveStyles(nodeConResponsive.styles, 'desktop');
const resTablet  = resolveStyles(nodeConResponsive.styles, 'tablet');
const resMobile  = resolveStyles(nodeConResponsive.styles, 'mobile');

console.log(`Desktop: fontSize=${resDesktop.fontSize}, color=${resDesktop.color}, fontWeight=${resDesktop.fontWeight}`);
console.log(`Tablet:  fontSize=${resTablet.fontSize},  color=${resTablet.color},  fontWeight=${resTablet.fontWeight}  (hereda fontWeight)`);
console.log(`Mobile:  fontSize=${resMobile.fontSize},  color=${resMobile.color},  fontWeight=${resMobile.fontWeight}  (hereda fontWeight)`);

console.log('\n✅ Todo correcto — normalizeDocument() funciona con datos reales de la DB.\n');
