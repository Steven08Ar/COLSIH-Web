/**
 * High-performance Client-side Image Optimizer & HEIC Converter.
 * Automatically converts HEIC/HEIF files, resizes oversized photos to optimal web dimensions,
 * and compresses JPEG, PNG, WEBP files using HTML5 Canvas to achieve up to 90% size reduction
 * without perceptible quality loss.
 * 
 * @param {File} file - Original file uploaded by user
 * @param {Object} options - Custom options { maxWidth, maxHeight, quality, format }
 * @returns {Promise<File>}
 */
export async function processImageFile(file, options = {}) {
    if (!file || !(file instanceof File)) return file;

    const {
        maxWidth = 2560,
        maxHeight = 2560,
        quality = 0.82,
        format = 'image/webp'
    } = options;

    const fileNameLower = file.name.toLowerCase();
    const isHeic = fileNameLower.endsWith('.heic') || 
                   fileNameLower.endsWith('.heif') ||
                   file.type === 'image/heic' || 
                   file.type === 'image/heif';

    let workingFile = file;

    // 1. Convert HEIC/HEIF to JPEG first
    if (isHeic) {
        try {
            const heic2anyModule = await import('heic2any');
            const heic2any = heic2anyModule.default || heic2anyModule;

            const convertedBlob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.88,
            });

            const blobResult = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            const newFileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');

            workingFile = new File([blobResult], newFileName, { 
                type: 'image/jpeg',
                lastModified: Date.now()
            });
        } catch (error) {
            console.error('HEIC conversion error:', error);
        }
    }

    // Skip SVG, GIF (animated), or non-image files
    if (workingFile.type === 'image/svg+xml' || workingFile.type === 'image/gif' || !workingFile.type.startsWith('image/')) {
        return workingFile;
    }

    // 2. Perform Canvas Resizing and WebP/JPEG Compression
    try {
        return await new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(workingFile);

            img.onload = () => {
                URL.revokeObjectURL(url);

                let { width, height } = img;

                // Only scale down if image dimensions exceed max limits
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                // Check browser support for WebP export
                const isWebpSupported = (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0);
                const targetType = (format === 'image/webp' && isWebpSupported) ? 'image/webp' : 'image/jpeg';
                const extension = targetType === 'image/webp' ? '.webp' : '.jpg';
                const outputName = workingFile.name.replace(/\.[^/.]+$/, "") + extension;

                canvas.toBlob(
                    (blob) => {
                        if (!blob || blob.size >= workingFile.size) {
                            // If compression didn't reduce file size, return workingFile
                            resolve(workingFile);
                        } else {
                            resolve(new File([blob], outputName, {
                                type: targetType,
                                lastModified: Date.now()
                            }));
                        }
                    },
                    targetType,
                    quality
                );
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(workingFile);
            };

            img.src = url;
        });
    } catch (err) {
        console.warn('Canvas image compression failed, fallback to original:', err);
        return workingFile;
    }
}
