/**
 * Converts HEIC/HEIF files to standard JPEG files dynamically in the browser.
 * Uses dynamic import so heic2any module is loaded only on demand.
 * 
 * @param {File} file 
 * @returns {Promise<File>}
 */
export async function processImageFile(file) {
    if (!file || !(file instanceof File)) return file;

    const fileNameLower = file.name.toLowerCase();
    const isHeic = fileNameLower.endsWith('.heic') || 
                   fileNameLower.endsWith('.heif') ||
                   file.type === 'image/heic' || 
                   file.type === 'image/heif';

    if (!isHeic) {
        return file;
    }

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

        return new File([blobResult], newFileName, { 
            type: 'image/jpeg',
            lastModified: Date.now()
        });
    } catch (error) {
        console.error('HEIC conversion error:', error);
        return file;
    }
}
