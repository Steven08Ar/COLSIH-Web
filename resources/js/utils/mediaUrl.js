/**
 * Resuelve la URL pública de un archivo multimedia.
 * - Si la ruta ya es una URL completa (R2), la retorna tal cual.
 * - Si es una ruta relativa (almacenamiento local), antepone /storage/.
 * - Si es null/undefined, retorna null.
 */
export function mediaUrl(path) {
    if (!path) return null;
    let url = path;
    if (typeof url === 'string') {
        url = url.replace(/https:\/\/[^/]+\.r2\.dev\//gi, 'https://media.colsih.edu.co/');
    }
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/storage/${url}`;
}
