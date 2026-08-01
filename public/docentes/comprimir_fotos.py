"""
Comprimir fotos JPG y PNG para web sin perder calidad visual.

- Busca todas las imágenes .jpg / .jpeg / .png en la carpeta donde se ejecuta el script.
- Guarda la versión comprimida (más liviana) en la raíz, con el mismo nombre.
- Mueve la foto original (pesada) a una carpeta nueva llamada "Originales".

Requisitos:
    pip install Pillow

Uso:
    Coloca este script en la misma carpeta donde están tus fotos y ejecútalo:
    python comprimir_fotos.py
"""

import os
from pathlib import Path
from PIL import Image, ImageOps

# ----------------- CONFIGURACIÓN -----------------
CALIDAD_JPG = 85       # 1-100. 80-90 es el punto ideal: se ve igual, pesa mucho menos.
LADO_MAXIMO = 1920      # Se aplica al lado más largo (ancho si es horizontal, alto si es vertical). None para no redimensionar.
CARPETA_ORIGINALES = "Originales"
EXTENSIONES = (".jpg", ".jpeg", ".png")
# ---------------------------------------------------


def redimensionar_si_hace_falta(img: Image.Image) -> Image.Image:
    if not LADO_MAXIMO:
        return img

    lado_actual = max(img.width, img.height)
    if lado_actual <= LADO_MAXIMO:
        return img

    proporcion = LADO_MAXIMO / float(lado_actual)
    nuevo_ancho = int(img.width * proporcion)
    nuevo_alto = int(img.height * proporcion)
    return img.resize((nuevo_ancho, nuevo_alto), Image.LANCZOS)


def comprimir_imagen(ruta_origen: Path, ruta_destino: Path):
    extension = ruta_origen.suffix.lower()

    with Image.open(ruta_origen) as img:
        # Aplica la rotación indicada en los metadatos EXIF (fotos de celular
        # verticales) y luego elimina esos metadatos, ya que la imagen queda
        # físicamente girada y ya no los necesita.
        img = ImageOps.exif_transpose(img)

        img = redimensionar_si_hace_falta(img)

        if extension == ".png":
            # PNG es sin pérdida: la compresión no reduce calidad,
            # solo optimiza cómo se guardan los datos.
            if img.mode not in ("RGB", "RGBA"):
                img = img.convert("RGBA" if "A" in img.mode else "RGB")
            img.save(
                ruta_destino,
                "PNG",
                optimize=True,
                compress_level=9,
            )
        else:
            # JPG no soporta transparencia, así que convertimos a RGB
            if img.mode != "RGB":
                img = img.convert("RGB")
            img.save(
                ruta_destino,
                "JPEG",
                quality=CALIDAD_JPG,
                optimize=True,
                progressive=True,
            )


def main():
    carpeta_actual = Path(".").resolve()
    carpeta_originales = carpeta_actual / CARPETA_ORIGINALES
    carpeta_originales.mkdir(exist_ok=True)

    fotos = [
        f for f in carpeta_actual.iterdir()
        if f.is_file() and f.suffix.lower() in EXTENSIONES
    ]

    if not fotos:
        print("No se encontraron fotos .jpg/.jpeg/.png en esta carpeta.")
        return

    print(f"Procesando {len(fotos)} foto(s)...\n")

    peso_antes_total = 0
    peso_despues_total = 0

    for foto in fotos:
        peso_original = foto.stat().st_size
        destino_original = carpeta_originales / foto.name

        # Comprimir a un archivo temporal antes de mover el original,
        # así evitamos perder la foto si algo falla a mitad de camino.
        temporal = foto.with_suffix(foto.suffix + ".tmp")
        comprimir_imagen(foto, temporal)

        # Mover el original pesado a la carpeta "Originales"
        foto.rename(destino_original)

        # Dejar la versión comprimida en la raíz con el nombre original
        temporal.rename(foto)

        peso_comprimido = foto.stat().st_size
        peso_antes_total += peso_original
        peso_despues_total += peso_comprimido

        ahorro = 100 * (1 - peso_comprimido / peso_original) if peso_original else 0
        print(f"{foto.name}: {peso_original/1024:.0f} KB -> {peso_comprimido/1024:.0f} KB "
              f"(-{ahorro:.0f}%)")

    print("\nListo ✅")
    print(f"Peso total antes:   {peso_antes_total/1024/1024:.2f} MB")
    print(f"Peso total después: {peso_despues_total/1024/1024:.2f} MB")
    print(f"Originales guardados en: {carpeta_originales}")


if __name__ == "__main__":
    main()