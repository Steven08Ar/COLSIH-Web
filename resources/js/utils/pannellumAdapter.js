/**
 * Utility helper to convert raw Laravel/Backend JSON scene data
 * into Pannellum's multiScene configuration object.
 */

export function buildPannellumConfig(
    scenes = [], 
    onSceneChange = null, 
    initialSceneSlug = null, 
    onInfoClick = null,
    getViewer = null
) {
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
                    clickHandlerFunc: function(e, args) {
                        const viewer = (getViewer ? getViewer() : null) || this;
                        const targetPitch = Number(args.pitch || 0);
                        const targetYaw = Number(args.yaw || 0);

                        // Animación Zoom In Estilo Google Maps Street View hacia la coordenada
                        if (viewer && typeof viewer.getHfov === 'function') {
                            let currentHfov = viewer.getHfov();
                            let startPitch = viewer.getPitch();
                            let startYaw = viewer.getYaw();
                            
                            let targetHfov = 35; // Zoom profundo hacia la coordenada de destino
                            let steps = 14;
                            let stepCount = 0;

                            let animInterval = setInterval(() => {
                                stepCount++;
                                let progress = stepCount / steps;
                                let easeProgress = progress * progress; // Curva acelerada hacia el frente

                                let nextPitch = startPitch + (targetPitch - startPitch) * easeProgress;
                                let nextYaw = startYaw + (targetYaw - startYaw) * easeProgress;
                                let nextHfov = currentHfov + (targetHfov - currentHfov) * easeProgress;

                                try {
                                    viewer.setPitch(nextPitch);
                                    viewer.setYaw(nextYaw);
                                    viewer.setHfov(nextHfov);
                                } catch (err) {}

                                if (stepCount >= steps) {
                                    clearInterval(animInterval);
                                    if (onSceneChange && args && args.targetSlug) {
                                        onSceneChange(args.targetSlug);
                                    }
                                }
                            }, 18);
                        } else {
                            if (onSceneChange && args && args.targetSlug) {
                                onSceneChange(args.targetSlug);
                            }
                        }
                    },
                    clickHandlerArgs: { targetSlug: targetSlug, pitch: hs.pitch, yaw: hs.yaw }
                };
            }

            // Default 'info' type
            const previewText = hs.texto
                ? (hs.texto.length > 28 ? hs.texto.substring(0, 28) + '...' : hs.texto)
                : 'Información';

            return {
                pitch: Number(hs.pitch || 0),
                yaw: Number(hs.yaw || 0),
                type: 'info',
                text: hs.texto || '',
                cssClass: 'custom-hotspot-info-public',
                createTooltipFunc: (hotSpotDiv) => {
                    hotSpotDiv.innerHTML = `
                        <div class="hotspot-info-inner">i</div>
                        <div class="hotspot-tooltip-preview">${previewText}</div>
                    `;
                },
                clickHandlerFunc: (e, args) => {
                    if (onInfoClick && args && args.hotspot) {
                        onInfoClick(args.hotspot);
                    }
                },
                clickHandlerArgs: { hotspot: hs }
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
            sceneFadeDuration: 750,
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
