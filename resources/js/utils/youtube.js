/**
 * Utility helper to handle YouTube video URLs and prevent Error 153 / embed errors.
 */

export function extractYouTubeVideoId(url) {
    if (!url) return null;
    const clean = url.trim();

    // Universal RegExp to match YouTube video IDs (11 chars) from all URL formats:
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://youtu.be/VIDEO_ID
    // - https://www.youtube.com/embed/VIDEO_ID
    // - https://www.youtube.com/shorts/VIDEO_ID
    // - https://www.youtube.com/v/VIDEO_ID
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = clean.match(regExp);

    if (match && match[1] && match[1].length === 11) {
        return match[1];
    }

    // Direct 11-char fallback or regex match within string
    const altMatch = clean.match(/([a-zA-Z0-9_-]{11})/);
    return altMatch ? altMatch[1] : null;
}

export function getYouTubeEmbedUrl(url, options = {}) {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) return null;

    const { autoplay = true } = options;
    const params = new URLSearchParams();

    if (autoplay) {
        params.append('autoplay', '1');
    }
    params.append('modestbranding', '1');
    params.append('rel', '0');
    params.append('playsinline', '1');

    if (typeof window !== 'undefined' && window.location.origin) {
        params.append('origin', window.location.origin);
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeWatchUrl(url) {
    const videoId = extractYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
}

export function getYouTubeThumbnailUrl(url) {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
