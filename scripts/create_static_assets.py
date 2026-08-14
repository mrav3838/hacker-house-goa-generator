from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import random

out = Path("client/public/assets")
out.mkdir(parents=True, exist_ok=True)

# Warm Goa sunset hero: a lightweight local raster fallback for static hosting.
w, h = 1600, 900
hero = Image.new("RGB", (w, h))
p = hero.load()
for y in range(h):
    t = y / (h - 1)
    if t < 0.62:
        q = t / 0.62
        c1, c2 = (20, 40, 51), (222, 93, 65)
    else:
        q = (t - 0.62) / 0.38
        c1, c2 = (222, 93, 65), (8, 25, 30)
    color = tuple(int(c1[i] * (1 - q) + c2[i] * q) for i in range(3))
    for x in range(w):
        glow = max(0, 1 - (((x - w * .67) / (w * .42)) ** 2 + ((y - h * .55) / (h * .35)) ** 2))
        p[x, y] = tuple(min(255, int(color[i] + glow * (35 if i == 0 else 18))) for i in range(3))
d = ImageDraw.Draw(hero)
d.ellipse((w*.58, h*.49, w*.68, h*.63), fill=(255, 199, 86))
d.rectangle((0, int(h*.76), w, h), fill=(8, 25, 30))
for x in range(-100, w + 100, 90):
    d.polygon([(x, h), (x + 70, h), (x + 42, h*.72), (x + 25, h*.79)], fill=(5, 19, 24))
hero.save(out / "goa-sunset-hero.jpg", quality=88, optimize=True)

# Subtle dark card texture.
random.seed(7)
texture = Image.new("RGB", (1000, 700), (22, 28, 39))
td = ImageDraw.Draw(texture, "RGBA")
for _ in range(1800):
    x, y = random.randrange(1000), random.randrange(700)
    r = random.randrange(1, 8)
    td.ellipse((x-r, y-r, x+r, y+r), fill=(255, 190, 120, random.randrange(3, 18)))
texture = texture.filter(ImageFilter.GaussianBlur(1.2))
texture.save(out / "goa-card-texture.jpg", quality=88, optimize=True)

# Local sun-wave mark matching the palette, with transparent background.
logo = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
ld = ImageDraw.Draw(logo)
ld.ellipse((84, 30, 172, 118), outline=(255, 200, 87, 255), width=12)
for y, phase in [(140, 0), (166, 16), (192, 32)]:
    pts = []
    for x in range(38, 220, 4):
        yy = y + int(10 * __import__('math').sin((x + phase) / 18))
        pts.append((x, yy))
    ld.line(pts, fill=(140, 228, 195, 255), width=10)
logo.save(out / "hh-sun-wave-logo.png")
