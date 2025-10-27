#!/usr/bin/env python3
import sys
from pathlib import Path
from PIL import Image

BASE = Path('/Users/lucie/moverz_main-1')
MASTER = BASE / 'public' / 'logo.png'

ICON_SPECS = [
    ('android-chrome-192x192.png', 192, False),
    ('android-chrome-512x512.png', 512, False),
    ('maskable-192.png', 192, True),
    ('maskable-512.png', 512, True),
    ('apple-touch-icon.png', 180, False),
]

CITIES = [
    'bordeaux', 'lille', 'lyon', 'marseille', 'montpellier',
    'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'
]


def make_square(image: Image.Image, size: int, background=(0, 0, 0, 0)) -> Image.Image:
    """Pad image to a square before resizing, keeping aspect ratio."""
    w, h = image.size
    if w == h:
        return image.resize((size, size), Image.LANCZOS)
    side = max(w, h)
    canvas = Image.new('RGBA', (side, side), background)
    offset = ((side - w) // 2, (side - h) // 2)
    canvas.paste(image, offset, image if image.mode in ('RGBA', 'LA') else None)
    return canvas.resize((size, size), Image.LANCZOS)


def make_maskable(image: Image.Image, size: int) -> Image.Image:
    """Create a maskable icon by adding safe padding around the subject."""
    # Maskable guidance: keep key content within ~80-88% safe zone.
    safe_ratio = 0.82
    target_inner = int(size * safe_ratio)
    squared = make_square(image, target_inner)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    offset = ((size - target_inner) // 2, (size - target_inner) // 2)
    canvas.paste(squared, offset, squared)
    return canvas


def write_icons(dest_icons_dir: Path, src: Image.Image):
    dest_icons_dir.mkdir(parents=True, exist_ok=True)
    for filename, size, is_maskable in ICON_SPECS:
        if is_maskable:
            out = make_maskable(src, size)
        else:
            out = make_square(src, size)
        out.save(dest_icons_dir / filename, format='PNG')


def main():
    if not MASTER.exists():
        print(f"Master logo not found: {MASTER}", file=sys.stderr)
        sys.exit(1)

    src_img = Image.open(MASTER).convert('RGBA')

    # Main site
    write_icons(BASE / 'public' / 'icons', src_img)

    # Per-city
    for city in CITIES:
        city_public = BASE / 'sites' / city / 'public'
        city_public.mkdir(parents=True, exist_ok=True)
        # Copy master logo as site logo
        (city_public / 'logo.png').write_bytes(MASTER.read_bytes())
        write_icons(city_public / 'icons', src_img)
        print(f"Generated icons for {city}")

    print('All icons generated successfully.')


if __name__ == '__main__':
    main()



