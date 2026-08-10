/**
 * @file normalizeDocument.js
 * Función de normalización: convierte cualquier formato de `bloques` al Document Model canónico v2.
 *
 * RESPONSABILIDAD: Legacy document → CanonicalDocument v2. Nada más.
 *
 * Esta función es esencialmente pura:
 *   - Sin llamadas HTTP
 *   - Sin acceso a storage
 *   - Sin modificación del DOM
 *   - Sin side effects observables
 *   - Sin lógica de UI
 *   - Sin generación de HTML
 *
 * La única fuente de no-determinismo intencional: generación de UUID v4 para bloques
 * legacy que carecen de ID. Una vez guardados en DB con v2, los IDs son estables.
 *
 * @module normalizeDocument
 */

import { v4 as uuidv4 } from 'uuid';

// ─────────────────────────────────────────────────────────────────────────────
// Mapas de conversión Tailwind → CSS
// Exhaustivos según los valores reales usados en PropertyPanel.jsx.
// Añadir aquí si se agregan nuevas opciones al panel.
// ─────────────────────────────────────────────────────────────────────────────

/** @type {Record<string, string>} */
const BG_GRADIENT_MAP = {
    'from-blue-50 to-indigo-50':  'linear-gradient(135deg, #EFF6FF, #EEF2FF)',
    'from-amber-50 to-orange-50': 'linear-gradient(135deg, #FFFBEB, #FFF7ED)',
    'from-rose-50 to-red-50':     'linear-gradient(135deg, #FFF1F2, #FEF2F2)',
    'from-slate-50 to-slate-100': 'linear-gradient(135deg, #F8FAFC, #F1F5F9)',
};

/** @type {Record<string, string>} */
const BORDER_RADIUS_MAP = {
    'rounded-none':   '0',
    'rounded-xl':     '12px',
    'rounded-2xl':    '16px',
    'rounded-[32px]': '32px',
};

/**
 * @type {Record<string, { top: string, right: string, bottom: string, left: string }>}
 */
const PADDING_MAP = {
    'p-4':         { top: '16px', right: '16px', bottom: '16px', left: '16px' },
    'p-6':         { top: '24px', right: '24px', bottom: '24px', left: '24px' },
    'p-8':         { top: '32px', right: '32px', bottom: '32px', left: '32px' },
    'p-12':        { top: '48px', right: '48px', bottom: '48px', left: '48px' },
    'py-20 px-12': { top: '80px', right: '48px', bottom: '80px', left: '48px' },
};

/** @type {Record<string, { top: string, bottom: string }>} */
const MARGIN_MAP = {
    'my-2':  { top: '8px',  bottom: '8px'  },
    'my-4':  { top: '16px', bottom: '16px' },
    'my-8':  { top: '32px', bottom: '32px' },
    'my-12': { top: '48px', bottom: '48px' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers de conversión Tailwind → CSS
// ─────────────────────────────────────────────────────────────────────────────

/** @param {string|undefined} value */
function bgGradientToCSS(value) {
    if (!value) return undefined;
    return BG_GRADIENT_MAP[value];
}

/** @param {string|undefined} value */
function borderRadiusToCSS(value) {
    if (!value) return undefined;
    return BORDER_RADIUS_MAP[value];
}

/**
 * @param {string|undefined} value
 * @returns {{ paddingTop?: string, paddingRight?: string, paddingBottom?: string, paddingLeft?: string }}
 */
function paddingToCSS(value) {
    if (!value) return {};
    const p = PADDING_MAP[value];
    if (!p) return {};
    return {
        paddingTop:    p.top,
        paddingRight:  p.right,
        paddingBottom: p.bottom,
        paddingLeft:   p.left,
    };
}

/**
 * @param {string|undefined} value
 * @returns {{ marginTop?: string, marginBottom?: string }}
 */
function marginToCSS(value) {
    if (!value) return {};
    const m = MARGIN_MAP[value];
    if (!m) return {};
    return {
        marginTop:    m.top,
        marginBottom: m.bottom,
    };
}

/** @param {string|undefined} width - "estrecho" | "mediano" | "completo" */
function widthToColumnSpan(width) {
    if (width === 'estrecho') return 4;
    if (width === 'mediano')  return 6;
    return 12;
}

/** @param {*} id */
function isValidId(id) {
    return typeof id === 'string' && id.trim().length >= 4;
}

/**
 * Determina si un objeto de estilos ya tiene estructura responsive
 * { desktop: {}, tablet: {}, mobile: {} }.
 * @param {*} styles
 */
function isResponsiveStyles(styles) {
    if (!styles || typeof styles !== 'object' || Array.isArray(styles)) return false;
    return Object.hasOwn(styles, 'desktop')
        || Object.hasOwn(styles, 'tablet')
        || Object.hasOwn(styles, 'mobile');
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalización de estilos
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convierte un objeto de estilos plano (mezcla CSS + Tailwind del PropertyPanel)
 * al objeto desktop de ResponsiveStyles.
 * Preserva los valores CSS directamente; convierte los valores Tailwind.
 *
 * @param {Object} s - flat styles object
 * @param {Object} f - formato object (legacy)
 * @returns {import('./types').StylesBlock}
 */
function flatStylesToDesktop(s, f) {
    const desktop = {};

    // Tipografía — valores CSS directos
    const fontSize = s.fontSize
        || (f.size === 'muy-grande' ? '28px' : f.size === 'grande' ? '20px' : undefined);
    if (fontSize) desktop.fontSize = fontSize;

    const fontWeight = s.fontWeight
        || (f.bold ? '700' : undefined);
    if (fontWeight) desktop.fontWeight = fontWeight;

    const fontStyle = s.fontStyle
        || (f.italic ? 'italic' : undefined);
    if (fontStyle) desktop.fontStyle = fontStyle;

    const textDecoration = s.textDecoration
        || (f.underline ? 'underline' : undefined);
    if (textDecoration) desktop.textDecoration = textDecoration;

    // PropertyPanel guarda 'align'; el modelo canónico usa 'textAlign'
    if (s.align) desktop.textAlign = s.align;

    // Color — preferir hex directo (styles.textColor) sobre semántico (formato.color)
    const color = s.textColor
        || (f.color === 'rojo' ? '#800A15'
          : f.color === 'azul' ? '#003C8F'
          : undefined);
    if (color) desktop.color = color;

    // Fondo — Tailwind → CSS
    const backgroundImage = bgGradientToCSS(s.bgGradient);
    if (backgroundImage) desktop.backgroundImage = backgroundImage;

    // Espaciado — Tailwind → CSS
    Object.assign(desktop, paddingToCSS(s.padding));
    Object.assign(desktop, marginToCSS(s.margin));

    // Borde — Tailwind → CSS
    const borderRadius = borderRadiusToCSS(s.borderRadius);
    if (borderRadius) desktop.borderRadius = borderRadius;

    return desktop;
}

/**
 * Normaliza los estilos de un bloque legacy al formato ResponsiveStyles canónico.
 * Detecta automáticamente si los estilos ya son responsive o son planos.
 *
 * @param {Object} block - Bloque legacy con posibles campos .styles y .formato
 * @returns {import('./types').ResponsiveStyles}
 */
function normalizeLegacyStyles(block) {
    const rawStyles = block.styles;
    const formato   = block.formato || {};

    // Caso 1: ya tiene estructura responsive { desktop, tablet, mobile }
    if (isResponsiveStyles(rawStyles)) {
        return {
            desktop: rawStyles.desktop || {},
            tablet:  rawStyles.tablet  || {},
            mobile:  rawStyles.mobile  || {},
        };
    }

    // Caso 2: flat styles object (mezcla CSS + Tailwind del PropertyPanel)
    const s = (rawStyles && typeof rawStyles === 'object') ? rawStyles : {};
    return {
        desktop: flatStylesToDesktop(s, formato),
        tablet:  {},
        mobile:  {},
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalización de props (contenido)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convierte los campos de contenido de un bloque legacy al objeto props canónico.
 * Separación clara: props = lo que hace al bloque funcionar (contenido),
 * NO propiedades visuales (esas van en styles).
 *
 * @param {Object} block - Bloque en cualquier formato legacy
 * @returns {Object} Props canónicas según el tipo
 */
function normalizeLegacyProps(block) {
    // Si ya tiene props canónicas, preservarlas sin transformar
    if (block.props && typeof block.props === 'object' && !Array.isArray(block.props)) {
        return block.props;
    }

    const tipo = block.tipo;

    switch (tipo) {
        case 'texto':
            return {
                text: block.contenido || '',
            };

        case 'titulo':
            return {
                text:  block.contenido || '',
                // 'level' puede estar en content.level (formato editor) o defecto 'h3'
                level: block.content?.level || 'h3',
            };

        case 'cita':
            return {
                quote:  block.contenido || '',
                author: block.autor     || '',
            };

        case 'imagen':
            return {
                // dbPath: ruta en storage — persiste en DB; NO la URL completa (derivada en render)
                dbPath:  block.imagen    || '',
                caption: block.leyenda   || '',
            };

        case 'video':
            return {
                url:       block.url       || '',
                title:     block.titulo    || '',
                videoFile: block.videoFile || '',
            };

        case 'ficha':
            return {
                title: block.titulo || '',
                items: block.items  || '',
            };

        case 'separador':
            // separatorStyle es semántico — va en props, NO en styles
            return {
                separatorStyle: block.styles?.separatorStyle || 'punto',
            };

        case 'hero':
            // hero/cards son tipos editor-only que no tienen DB mapping en el controller actual
            // Se preserva desde content (formato editor) con fallback a vacío
            return {
                title:       block.content?.title       || '',
                subtitle:    block.content?.subtitle    || '',
                tagline:     block.content?.tagline     || '',
                buttonText:  block.content?.buttonText  || '',
                buttonColor: block.content?.buttonColor || '',
            };

        case 'cards':
            return {
                items: Array.isArray(block.content?.items) ? block.content.items : [],
            };

        default:
            // Tipos desconocidos o sin implementar: preservar cualquier
            // estructura de content que exista para no perder datos
            if (block.content && typeof block.content === 'object') {
                return { ...block.content };
            }
            if (block.contenido !== undefined) {
                return { text: block.contenido || '' };
            }
            return {};
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalización de un nodo individual
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convierte un bloque legacy individual a un CanonicalNode.
 *
 * @param {Object} block - Bloque en formato legacy v1
 * @param {number} index - Posición original en el array
 * @returns {import('./types').CanonicalNode}
 */
function normalizeLegacyBlock(block, index) {
    const id = isValidId(block.id) ? block.id : uuidv4();

    return {
        id,
        type:     block.tipo || 'desconocido',
        parentId: null,
        order:    index,
        props:    normalizeLegacyProps(block),
        styles:   normalizeLegacyStyles(block),
        layout: {
            columnSpan: widthToColumnSpan(block.width),
        },
        locked: false,
        hidden: false,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// API pública
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convierte cualquier formato de la columna `bloques` al Document Model canónico v2.
 *
 * Casos manejados:
 *   - null / undefined / valor inválido  → documento vacío (v2)
 *   - Array (legacy v1)                  → migración completa a v2
 *   - Object con version: 2              → validación y limpieza, nodos normalizados
 *
 * Cascade de herencia para estilos responsive:
 *   desktop (base) ← tablet ← mobile
 *   resolved_tablet = { ...desktop, ...tablet }
 *   resolved_mobile = { ...desktop, ...tablet, ...mobile }
 *
 * @param {Array|Object|null|undefined} rawBloques - Valor de la columna `bloques` de la DB
 * @returns {import('./types').CanonicalDocument}
 */
export function normalizeDocument(rawBloques) {
    // ── Caso: ya es v2 ────────────────────────────────────────────────────────
    if (
        rawBloques
        && typeof rawBloques === 'object'
        && !Array.isArray(rawBloques)
        && rawBloques.version === 2
    ) {
        const nodes = Array.isArray(rawBloques.nodes) ? rawBloques.nodes : [];
        return {
            version: 2,
            id:      rawBloques.id   || 'page_root',
            type:    rawBloques.type || 'page',
            // Normalizar cada nodo para manejar el caso "parcialmente v2":
            // documentos con version: 2 pero nodos con flat styles o props legacy
            nodes: nodes
                .filter(n => n && typeof n === 'object')
                .map((node, index) => normalizeV2Node(node, index)),
        };
    }

    // ── Caso: array legacy v1 ─────────────────────────────────────────────────
    if (Array.isArray(rawBloques)) {
        return {
            version: 2,
            id:      'page_root',
            type:    'page',
            nodes: rawBloques
                .filter(b => b && typeof b === 'object')
                .map((block, index) => normalizeLegacyBlock(block, index)),
        };
    }

    // ── Caso: null, undefined, tipo inválido → documento vacío ───────────────
    return {
        version: 2,
        id:      'page_root',
        type:    'page',
        nodes:   [],
    };
}

/**
 * Normaliza un nodo que ya está en formato v2 pero puede tener
 * estilos planos o props en formato legacy (migración parcial).
 *
 * @param {Object} node  - Nodo en formato v2 (posiblemente incompleto)
 * @param {number} index - Posición en el array
 * @returns {import('./types').CanonicalNode}
 */
function normalizeV2Node(node, index) {
    const id = isValidId(node.id) ? node.id : uuidv4();

    // Estilos: si no son responsive todavía, normalizarlos
    const styles = isResponsiveStyles(node.styles)
        ? { desktop: node.styles.desktop || {}, tablet: node.styles.tablet || {}, mobile: node.styles.mobile || {} }
        : normalizeLegacyStyles(node);

    return {
        id,
        type:     node.type     || node.tipo || 'desconocido',
        parentId: node.parentId ?? null,
        order:    typeof node.order === 'number' ? node.order : index,
        props:    node.props    || normalizeLegacyProps({ ...node, tipo: node.type || node.tipo }),
        styles,
        layout: {
            columnSpan: node.layout?.columnSpan ?? widthToColumnSpan(node.width),
        },
        locked: node.locked ?? false,
        hidden: node.hidden ?? false,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers de traversal (operan sobre el flat array — NO sobre un árbol)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Obtiene los nodos hijos de un parentId dado, ordenados por `order`.
 * Es la única forma correcta de obtener hijos — NO existe children[] en los nodos.
 *
 * @param {import('./types').CanonicalNode[]} nodes
 * @param {string|null} parentId - null = hijos directos de la página
 * @returns {import('./types').CanonicalNode[]}
 */
export function getChildren(nodes, parentId) {
    return nodes
        .filter(n => n.parentId === parentId)
        .sort((a, b) => a.order - b.order);
}

/**
 * Busca un nodo por ID. O(n) — apropiado para documentos pequeños (<100 nodos).
 * Para acceso frecuente en renders calientes, usar buildNodeMap().
 *
 * @param {import('./types').CanonicalNode[]} nodes
 * @param {string} id
 * @returns {import('./types').CanonicalNode|undefined}
 */
export function getNodeById(nodes, id) {
    return nodes.find(n => n.id === id);
}

/**
 * Construye un Map id → nodo para acceso O(1).
 * Construir una vez y pasar como prop; no reconstruir en cada render.
 *
 * @param {import('./types').CanonicalNode[]} nodes
 * @returns {Map<string, import('./types').CanonicalNode>}
 */
export function buildNodeMap(nodes) {
    return new Map(nodes.map(n => [n.id, n]));
}

/**
 * Resuelve los estilos para un viewport, aplicando la herencia de cascada.
 * Cascade: desktop (base) → tablet → mobile
 *
 * @param {import('./types').ResponsiveStyles} responsiveStyles
 * @param {import('./types').Viewport} viewport
 * @returns {import('./types').StylesBlock}
 */
export function resolveStyles(responsiveStyles, viewport) {
    const desktop = responsiveStyles?.desktop || {};
    const tablet  = { ...desktop, ...(responsiveStyles?.tablet  || {}) };
    const mobile  = { ...tablet,  ...(responsiveStyles?.mobile  || {}) };

    if (viewport === 'mobile') return mobile;
    if (viewport === 'tablet') return tablet;
    return desktop;
}
