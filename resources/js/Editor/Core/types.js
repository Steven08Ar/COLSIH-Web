/**
 * @file types.js
 * Definiciones de tipos JSDoc para el Document Model canónico v2.
 *
 * Equivalente a TypeScript para proyectos JSX: VS Code lee estos @typedef
 * y provee IntelliSense, autocompletado y validación sin compilador TS.
 *
 * Referencia en otros archivos:
 *   /** @type {import('./types').CanonicalDocument} *\/
 */

/**
 * Los tres viewports del editor.
 * @typedef {'desktop' | 'tablet' | 'mobile'} Viewport
 */

/**
 * Estilos CSS resueltos para un viewport específico.
 * IMPORTANTE: todos los valores son CSS válidos — nunca clases Tailwind.
 *
 * @typedef {Object} StylesBlock
 *
 * Tipografía
 * @property {string} [fontSize]          - e.g. "16px", "28px"
 * @property {string} [fontWeight]        - "300" | "400" | "500" | "600" | "700" | "800"
 * @property {string} [fontStyle]         - "normal" | "italic"
 * @property {string} [textDecoration]    - "none" | "underline"
 * @property {string} [textAlign]         - "left" | "center" | "right"
 * @property {string} [lineHeight]        - e.g. "1.65"
 * @property {string} [letterSpacing]     - e.g. "0em"
 *
 * Color
 * @property {string} [color]             - Hex: "#475569" (reemplaza textColor + formato.color)
 *
 * Fondo
 * @property {string} [backgroundColor]  - Hex: "#ffffff"
 * @property {string} [backgroundImage]  - CSS gradient: "linear-gradient(...)"
 *
 * Espaciado (reemplaza Tailwind padding/margin)
 * @property {string} [paddingTop]
 * @property {string} [paddingRight]
 * @property {string} [paddingBottom]
 * @property {string} [paddingLeft]
 * @property {string} [marginTop]
 * @property {string} [marginRight]
 * @property {string} [marginBottom]
 * @property {string} [marginLeft]
 *
 * Borde (reemplaza Tailwind borderRadius)
 * @property {string} [borderRadius]      - e.g. "16px", "0"
 * @property {string} [borderWidth]       - e.g. "1px"
 * @property {string} [borderColor]       - Hex
 * @property {string} [borderStyle]       - "solid" | "dashed" | "dotted"
 *
 * Sombra
 * @property {string} [boxShadow]         - CSS box-shadow value
 */

/**
 * Sistema de estilos responsive.
 *
 * Cascade: desktop (base) → tablet (override) → mobile (override).
 * Para resolver los estilos de un viewport:
 *   desktop : { ...desktop }
 *   tablet  : { ...desktop, ...tablet }
 *   mobile  : { ...desktop, ...tablet, ...mobile }
 *
 * Solo los overrides necesarios van en tablet/mobile.
 * Un objeto vacío {} en tablet significa "heredar todo de desktop".
 *
 * @typedef {Object} ResponsiveStyles
 * @property {StylesBlock} desktop - Estilos base, siempre presente
 * @property {StylesBlock} tablet  - Solo overrides; puede ser {}
 * @property {StylesBlock} mobile  - Solo overrides; puede ser {}
 */

/**
 * Configuración de layout del nodo dentro del grid de la página.
 * @typedef {Object} NodeLayout
 * @property {number} columnSpan - Columnas ocupadas sobre 12 (estrecho=4, mediano=6, completo=12)
 */

/**
 * Props para bloques de tipo 'texto'.
 * @typedef {Object} TextoProps
 * @property {string} text - Contenido del párrafo
 */

/**
 * Props para bloques de tipo 'titulo'.
 * @typedef {Object} TituloProps
 * @property {string} text  - Texto del encabezado
 * @property {string} level - Nivel HTML: "h2" | "h3" | "h4"
 */

/**
 * Props para bloques de tipo 'imagen'.
 * @typedef {Object} ImagenProps
 * @property {string} dbPath  - Ruta en storage (persiste en DB). Usar mediaUrl(dbPath) para display.
 * @property {string} caption - Pie de foto / leyenda
 */

/**
 * Props para bloques de tipo 'video'.
 * @typedef {Object} VideoProps
 * @property {string} url       - URL de YouTube (o vacío si es archivo)
 * @property {string} title     - Título del video
 * @property {string} videoFile - Ruta en storage del archivo de video (o vacío si es YouTube)
 */

/**
 * Props para bloques de tipo 'cita'.
 * @typedef {Object} CitaProps
 * @property {string} quote  - Texto de la cita
 * @property {string} author - Autor o fuente
 */

/**
 * Props para bloques de tipo 'ficha'.
 * @typedef {Object} FichaProps
 * @property {string} title - Título de la ficha técnica
 * @property {string} items - Items separados por salto de línea (\n)
 */

/**
 * Props para bloques de tipo 'separador'.
 * @typedef {Object} SeparadorProps
 * @property {'simple' | 'punto' | 'espaciado'} separatorStyle - Estilo visual del separador
 */

/**
 * Props para bloques de tipo 'hero'.
 * @typedef {Object} HeroProps
 * @property {string} title       - Título principal
 * @property {string} subtitle    - Subtítulo descriptivo
 * @property {string} tagline     - Etiqueta/badge superior
 * @property {string} buttonText  - Texto del botón CTA
 * @property {string} buttonColor - Color hex del botón
 */

/**
 * Nodo canónico del documento. Unidad mínima del flat array.
 *
 * La relación padre-hijo se expresa únicamente a través de parentId.
 * NO existe un campo children[]. Los hijos se derivan del array
 * usando el helper getChildren(nodes, parentId).
 *
 * @typedef {Object} CanonicalNode
 * @property {string}          id       - UUID estable. Generado una vez; nunca cambia.
 * @property {string}          type     - Tipo del bloque (nombre legacy preservado: "texto", "titulo", etc.)
 * @property {string|null}     parentId - ID del nodo padre. null = hijo directo de la página.
 * @property {number}          order    - Posición entre hermanos (0-indexed). Determina el orden visual.
 * @property {Object}          props    - Contenido específico del tipo. Ver tipos *Props arriba.
 * @property {ResponsiveStyles} styles  - Estilos CSS responsive. Nunca contiene clases Tailwind.
 * @property {NodeLayout}      layout   - Configuración de layout (columnSpan).
 * @property {boolean}         locked   - Si true, el bloque no puede modificarse en el editor.
 * @property {boolean}         hidden   - Si true, el bloque no se muestra (ni en editor ni en público).
 */

/**
 * Documento canónico v2. Se almacena serializado como JSON en la columna `bloques` de noticias.
 *
 * La estructura es un flat array de nodos (no un árbol anidado).
 * La jerarquía se expresa mediante parentId en cada nodo.
 *
 * @typedef {Object} CanonicalDocument
 * @property {2}               version - Discriminador de versión. Siempre 2.
 * @property {string}          id      - ID de la página raíz. Siempre "page_root".
 * @property {'page'}          type    - Tipo del nodo raíz. Siempre "page".
 * @property {CanonicalNode[]} nodes   - Array plano de todos los nodos del documento.
 */

export {};
