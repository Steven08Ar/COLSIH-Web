/**
 * Redimensiona y comprime imágenes JPG/PNG/WebP usando Canvas.
 * Solo acepta formatos estándar — HEIC no es soportado.
 */
export async function processImageFile(file, options = {}) {
    if (!file || !(file instanceof File)) return file;

    const {
        maxWidth  = 2560,
        maxHeight = 2560,
        quality   = 0.82,
        format    = 'image/webp',
    } = options;

    // Ignorar SVG, GIF animado y no-imágenes
    if (
        file.type === 'image/svg+xml' ||
        file.type === 'image/gif' ||
        !file.type.startsWith('image/')
    ) {
        return file;
    }

    try {
        return await new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(url);

                let { width, height } = img;

                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width  = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement('canvas');
                canvas.width  = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled  = true;
                ctx.imageSmoothingQuality  = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                const isWebpSupported = canvas.toDataURL('image/webp').startsWith('data:image/webp');
                const targetType  = (format === 'image/webp' && isWebpSupported) ? 'image/webp' : 'image/jpeg';
                const outputName  = file.name;

                canvas.toBlob(
                    (blob) => {
                        if (!blob || blob.size >= file.size) {
                            resolve(file);
                        } else {
                            resolve(new File([blob], outputName, { type: targetType, lastModified: Date.now() }));
                        }
                    },
                    targetType,
                    quality,
                );
            };

            img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
            img.src = url;
        });
    } catch {
        return file;
    }
}
