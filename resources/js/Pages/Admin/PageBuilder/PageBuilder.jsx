import React, { useState, useEffect } from 'react';
import EditorToolbar from './EditorToolbar';
import EditorCanvas from './EditorCanvas';
import PropertyPanel from './PropertyPanel';

// Map database blocks to builder local format
function mapDbBlockToEditorBlock(dbBlock) {
    const id = dbBlock.id || 'block_' + Math.random().toString(36).substring(2, 9);
    const tipo = dbBlock.tipo;
    const width = dbBlock.width || 'completo';
    
    // Extract content fields
    const content = {};
    if (tipo === 'texto' || tipo === 'titulo') {
        content.text = dbBlock.contenido || '';
    } else if (tipo === 'cita') {
        content.quote = dbBlock.contenido || '';
        content.author = dbBlock.autor || '';
    } else if (tipo === 'imagen') {
        content.url = dbBlock.imagen ? `/storage/${dbBlock.imagen}` : '';
        content.caption = dbBlock.leyenda || '';
        content.dbPath = dbBlock.imagen || ''; // preserve original storage path
    } else if (tipo === 'video') {
        content.url = dbBlock.url || '';
        content.title = dbBlock.titulo || '';
        content.videoFile = dbBlock.videoFile || '';
    } else if (tipo === 'ficha') {
        content.title = dbBlock.titulo || 'Ficha Técnica';
        content.items = dbBlock.items || '';
    } else {
        content.text = dbBlock.contenido || '';
    }

    // Extract styles
    const styles = dbBlock.styles || {};
    // Fallback mapping from legacy formatting if present
    if (dbBlock.formato) {
        styles.fontSize = dbBlock.formato.size === 'muy-grande' ? '28px' : (dbBlock.formato.size === 'grande' ? '20px' : '16px');
        styles.fontWeight = dbBlock.formato.bold ? '700' : '400';
        styles.fontStyle = dbBlock.formato.italic ? 'italic' : 'normal';
        styles.textDecoration = dbBlock.formato.underline ? 'underline' : 'none';
        styles.textColor = dbBlock.formato.color === 'rojo' ? '#800A15' : (dbBlock.formato.color === 'azul' ? '#003C8F' : '#475569');
    }

    return { id, tipo, width, content, styles };
}

// Map local builder format blocks back to database structures on save
function mapEditorBlockToDbBlock(editorBlock) {
    const dbBlock = {
        tipo: editorBlock.tipo,
        width: editorBlock.width || 'completo',
        styles: editorBlock.styles || {}
    };

    if (editorBlock.tipo === 'texto' || editorBlock.tipo === 'titulo') {
        dbBlock.contenido = editorBlock.content.text || '';
    } else if (editorBlock.tipo === 'cita') {
        dbBlock.contenido = editorBlock.content.quote || '';
        dbBlock.autor = editorBlock.content.author || '';
    } else if (editorBlock.tipo === 'imagen') {
        dbBlock.imagen = editorBlock.content.dbPath || '';
        dbBlock.leyenda = editorBlock.content.caption || '';
    } else if (editorBlock.tipo === 'video') {
        dbBlock.url = editorBlock.content.url || '';
        dbBlock.titulo = editorBlock.content.title || '';
        dbBlock.videoFile = editorBlock.content.videoFile || '';
    } else if (editorBlock.tipo === 'ficha') {
        dbBlock.titulo = editorBlock.content.title || 'Ficha Técnica';
        dbBlock.items = editorBlock.content.items || '';
    } else {
        dbBlock.contenido = editorBlock.content.text || '';
    }

    // Preserve legacy styles mapping
    const styles = editorBlock.styles || {};
    dbBlock.formato = {
        size: styles.fontSize === '28px' ? 'muy-grande' : (styles.fontSize === '20px' ? 'grande' : 'normal'),
        bold: styles.fontWeight === '700' || styles.fontWeight === '800',
        italic: styles.fontStyle === 'italic',
        underline: styles.textDecoration === 'underline',
        color: styles.textColor === '#800A15' ? 'rojo' : (styles.textColor === '#003C8F' ? 'azul' : 'gris')
    };

    return dbBlock;
}

export default function PageBuilder({ 
    onClose, 
    onSave, 
    initialTitle = '', 
    initialResumen = '',
    initialCategoria = 'noticia',
    initialPublicadoEn = '',
    initialPortada = null,
    initialBlocks = [],
    initialActivo = true
}) {
    const [pageTitle, setPageTitle] = useState(initialTitle);
    const [status, setStatus] = useState(initialActivo ? 'published' : 'draft');
    const [canvasWidth, setCanvasWidth] = useState('desktop');
    const [previewMode, setPreviewMode] = useState(false);
    const [selectedBlockId, setSelectedBlockId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Initialize state with real mapped blocks from db
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        if (initialBlocks && initialBlocks.length > 0) {
            setBlocks(initialBlocks.map(mapDbBlockToEditorBlock));
        } else {
            setBlocks([]);
        }
    }, [initialBlocks]);

    const activeBlock = blocks.find(b => b.id === selectedBlockId);

    function addBlock(tipo) {
        const id = 'block_' + Math.random().toString(36).substring(2, 9);
        let newBlock = {
            id,
            tipo,
            width: 'completo',
            styles: {
                padding: 'p-6',
                margin: 'my-4',
                borderRadius: 'rounded-2xl',
                shadow: 'shadow-xs'
            },
            content: {}
        };

        if (tipo === 'texto') {
            newBlock.content = { text: 'Haz clic aquí para escribir el contenido de este bloque de texto.' };
            newBlock.styles.fontSize = '16px';
            newBlock.styles.textColor = '#334155';
        } else if (tipo === 'titulo') {
            newBlock.content = { text: 'Título de Sección Nuevo', level: 'h3' };
            newBlock.styles.fontSize = '28px';
            newBlock.styles.fontWeight = '800';
            newBlock.styles.textColor = '#0f172a';
        } else if (tipo === 'imagen') {
            newBlock.content = { url: '', caption: 'Pie de foto descriptivo' };
        } else if (tipo === 'video') {
            newBlock.content = { url: '', title: '' };
        } else if (tipo === 'cita') {
            newBlock.content = { quote: 'Escribe aquí la cita destacada.', author: 'Autor' };
        } else if (tipo === 'ficha') {
            newBlock.content = { title: 'Ficha Técnica', items: 'Dato A: Valor A\nDato B: Valor B' };
        }

        setBlocks(p => [...p, newBlock]);
        setSelectedBlockId(id);
    }

    function updateBlockContent(id, newContent) {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, content: { ...b.content, ...newContent } } : b));
    }

    function updateBlockStyles(id, newStyles) {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, styles: { ...b.styles, ...newStyles } } : b));
    }

    function updateBlockWidth(id, newWidth) {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, width: newWidth } : b));
    }

    function deleteBlock(id) {
        setBlocks(prev => prev.filter(b => b.id !== id));
        if (selectedBlockId === id) setSelectedBlockId(null);
    }

    function duplicateBlock(id) {
        const blockToDup = blocks.find(b => b.id === id);
        if (!blockToDup) return;
        const newId = 'block_' + Math.random().toString(36).substring(2, 9);
        const duplicated = {
            ...blockToDup,
            id: newId,
            content: JSON.parse(JSON.stringify(blockToDup.content))
        };
        const idx = blocks.findIndex(b => b.id === id);
        const newBlocks = [...blocks];
        newBlocks.splice(idx + 1, 0, duplicated);
        setBlocks(newBlocks);
        setSelectedBlockId(newId);
    }

    function moveBlock(id, direction) {
        const idx = blocks.findIndex(b => b.id === id);
        if (idx === -1) return;
        if (direction === 'up' && idx === 0) return;
        if (direction === 'down' && idx === blocks.length - 1) return;

        const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
        setBlocks(prev => {
            const arr = [...prev];
            const temp = arr[idx];
            arr[idx] = arr[targetIdx];
            arr[targetIdx] = temp;
            return arr;
        });
    }

    // Drag-and-drop block reorder handler
    const handleReorderBlocks = (dragIdx, hoverIdx) => {
        setBlocks(prev => {
            const arr = [...prev];
            const dragged = arr[dragIdx];
            arr.splice(dragIdx, 1);
            arr.splice(hoverIdx, 0, dragged);
            return arr;
        });
    };

    return (
        <div className="fixed inset-0 bg-[#F5F7FA] z-[100] flex flex-col overflow-hidden text-slate-800 font-sans">
            
            <EditorToolbar
                pageTitle={pageTitle}
                setPageTitle={setPageTitle}
                status={status}
                setStatus={setStatus}
                canvasWidth={canvasWidth}
                setCanvasWidth={setCanvasWidth}
                previewMode={previewMode}
                setPreviewMode={setPreviewMode}
                onAddBlock={addBlock}
                onClose={onClose}
                onSave={() => onSave({
                    titulo: pageTitle,
                    resumen: initialResumen,
                    categoria: initialCategoria,
                    blocks: blocks.map(mapEditorBlockToDbBlock),
                    rawBlocks: blocks,
                    activo: status === 'published',
                    status
                })}
            />

            <div className="flex-1 flex overflow-hidden relative">
                
                <div className="flex-1 overflow-y-auto px-4 py-8">
                    <div className="w-full min-h-full flex flex-col items-center">
                        <EditorCanvas
                            blocks={blocks}
                            selectedBlockId={selectedBlockId}
                            onSelectBlock={setSelectedBlockId}
                            onUpdateBlock={updateBlockContent}
                            onDeleteBlock={deleteBlock}
                            onDuplicateBlock={duplicateBlock}
                            onMoveBlock={moveBlock}
                            onUpdateBlockWidth={updateBlockWidth}
                            canvasWidth={canvasWidth}
                            previewMode={previewMode}
                            onAddBlock={addBlock}
                            
                            // Mapped metadata to make it match Show.jsx
                            metaTitle={pageTitle}
                            metaResumen={initialResumen}
                            metaCategoria={initialCategoria}
                            metaPublicadoEn={initialPublicadoEn}
                            metaPortada={initialPortada}
                            onReorder={handleReorderBlocks}
                        />
                    </div>
                </div>

                {sidebarOpen && activeBlock && !previewMode && (
                    <div className="shrink-0 border-l border-slate-200/80 bg-white w-[350px] h-full flex flex-col shadow-xl z-20">
                        <PropertyPanel
                            block={activeBlock}
                            onUpdateStyles={(styles) => updateBlockStyles(activeBlock.id, styles)}
                            onUpdateContent={(content) => updateBlockContent(activeBlock.id, content)}
                            onClose={() => setSelectedBlockId(null)}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}
