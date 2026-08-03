/**
 * Resuelve la URL pública de un archivo multimedia.
 * - Si la ruta ya es una URL completa (R2), la retorna tal cual.
 * - Si es una ruta relativa (almacenamiento local), antepone /storage/.
 * - Si es null/undefined, retorna null.
 */
export function mediaUrl(path) {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return `/storage/${path}`;
}
