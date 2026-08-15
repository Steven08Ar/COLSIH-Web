/**
 * Compresor y optimizador de imágenes 360° en el navegador (HTML5 Canvas).
 * Reduce imágenes gigantestas (20MB-50MB) a un tamaño web óptimo (~1.5MB - 3MB)
 * manteniendo la calidad 360° equirrectangular para Pannellum sin saturar los límites de Nginx/PHP.
 */
export async function compressImageClientSide(file, maxSide = 4096, quality = 0.88) {
    if (!file || !(file instanceof File)) return file;

    // Si el archivo ya pesa menos de 2MB, no necesita compresión en el cliente
    if (file.size < 2 * 1024 * 1024) {
        return file;
    }

    return new Promise((resolve) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            let width = img.width;
            let height = img.height;

            // Escalar si supera la dimensión máxima web (ej: 4096px equirrectangular)
            if (width > maxSide || height > (maxSide / 2)) {
                if (width >= height * 1.5) { // Imagen equirrectangular 360° (relación 2:1 aproximadamente)
                    height = Math.round(maxSide / 2);
                    width = maxSide;
                } else {
                    if (width > height) {
                        height = Math.round((height * maxSide) / width);
                        width = maxSide;
                    } else {
                        width = Math.round((width * maxSide) / height);
                        height = maxSide;
                    }
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (!blob || blob.size >= file.size) {
                            resolve(file); // Si la compresión resultó igual o mayor, enviar el original
                            return;
                        }
                        const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(compressedFile);
                    },
                    'image/jpeg',
                    quality
                );
            } else {
                resolve(file);
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(file); // En caso de fallo de lectura, fallback al original
        };

        img.src = objectUrl;
    });
}
