#!/usr/bin/env python3
"""
Convierte un archivo HEIC/HEIF a JPEG.
Uso: python3 heic_to_jpg.py <ruta_entrada> <ruta_salida>
Requiere: pip install pillow pillow-heif
"""
import sys
import os


def main():
    if len(sys.argv) != 3:
        print("Uso: heic_to_jpg.py <entrada> <salida>", file=sys.stderr)
        sys.exit(1)

    entrada = sys.argv[1]
    salida = sys.argv[2]

    if not os.path.isfile(entrada):
        print(f"Archivo no encontrado: {entrada}", file=sys.stderr)
        sys.exit(1)

    try:
        import pillow_heif
        from PIL import Image

        pillow_heif.register_heif_opener()

        img = Image.open(entrada)
        img = img.convert("RGB")
        img.save(salida, "JPEG", quality=90, optimize=True)
        sys.exit(0)

    except ImportError as e:
        print(f"Dependencia faltante: {e}. Ejecuta: pip install pillow pillow-heif", file=sys.stderr)
        sys.exit(2)

    except Exception as e:
        print(f"Error de conversion: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
