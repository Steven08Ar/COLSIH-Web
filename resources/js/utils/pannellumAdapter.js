/**
 * Utility helper to convert raw Laravel/Backend JSON scene data
 * into Pannellum's multiScene configuration object.
 */

export function buildPannellumConfig(scenes = [], onSceneChange = null, initialSceneSlug = null) {
    if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
        return { default: {}, scenes: {} };
    }

    // Determine initial scene
    const firstSceneSlug = initialSceneSlug 
        || scenes.find(s => s.es_escena_inicial)?.slug 
        || scenes[0]?.slug;

    const pannellumScenes = {};

    scenes.forEach((scene) => {
        const key = scene.slug;

        // Map hotspots to Pannellum format
        const hotSpots = (scene.hotspots || []).map((hs) => {
            if (hs.tipo === 'enlace') {
                const targetScene = scenes.find(s => s.id === hs.scene_destino_id || s.slug === hs.scene_destino_slug);
                const targetSlug = targetScene ? targetScene.slug : (hs.scene_destino_slug || '');

                return {
                    pitch: Number(hs.pitch || 0),
                    yaw: Number(hs.yaw || 0),
                    type: 'scene',
                    text: hs.texto || (targetScene ? `Ir a ${targetScene.nombre}` : 'Ver siguiente espacio'),
                    sceneId: targetSlug,
                    cssClass: 'custom-hotspot-link-public',
                    createTooltipFunc: (hotSpotDiv) => {
                        hotSpotDiv.innerHTML = `<div class="hotspot-link-inner"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></div>`;
                    },
                    clickHandlerFunc: (e, args) => {
                        if (onSceneChange && args && args.targetSlug) {
                            onSceneChange(args.targetSlug);
                        }
                    },
                    clickHandlerArgs: { targetSlug: targetSlug }
                };
            }

            // Default 'info' type
            return {
                pitch: Number(hs.pitch || 0),
                yaw: Number(hs.yaw || 0),
                type: 'info',
                text: hs.texto || '',
                URL: hs.url || undefined,
                cssClass: 'custom-hotspot-info-public',
                createTooltipFunc: (hotSpotDiv) => {
                    hotSpotDiv.innerHTML = `<div class="hotspot-info-inner">i</div>`;
                }
            };
        });

        pannellumScenes[key] = {
            title: scene.nombre || '',
            type: 'equirectangular',
            panorama: scene.imagen_url || (scene.imagen_path ? `/storage/${scene.imagen_path}` : ''),
            yaw: Number(scene.yaw_inicial || 0),
            pitch: Number(scene.pitch_inicial || 0),
            hfov: Number(scene.hfov_inicial || 100),
            autoLoad: true,
            hotSpots: hotSpots
        };
    });

    return {
        default: {
            firstScene: firstSceneSlug,
            author: 'Colegio Santa Isabel de Hungría',
            sceneFadeDuration: 800,
            autoLoad: true,
            compass: true,
            showControls: true,
            mouseZoom: true,
            keyboardZoom: true,
            touchPanSpeedCoeffFactor: 1.2
        },
        scenes: pannellumScenes
    };
}
