from pathlib import Path
import shutil
import textwrap

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps
from reportlab.lib.pagesizes import A3
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "mooncamp-assets"
OUT = ROOT / "deliverables" / "mooncamp"
FINAL_RENDER = PUBLIC / "final-toy-render.png"

W, H = 2480, 3508

COLORS = {
    "canvas": "#F7F0E4",
    "paper": "#FFFDF5",
    "cream": "#F3E4CC",
    "cream_soft": "#FBF4E9",
    "line": "#DED2C2",
    "ink": "#2E2A23",
    "muted": "#756D62",
    "wood": "#C99A61",
    "wood_deep": "#9B6D3F",
    "wood_soft": "#E6CBA2",
    "blue": "#AFC7D8",
    "blue_deep": "#5F7F90",
    "orange": "#EAA45C",
    "sage": "#A7B89D",
    "sage_deep": "#6F8568",
    "white": "#FFFFFF",
}

FONT_REG = "C:/Windows/Fonts/Noto Sans SC (TrueType).otf"
FONT_MED = "C:/Windows/Fonts/Noto Sans SC Medium (TrueType).otf"
FONT_BOLD = "C:/Windows/Fonts/Noto Sans SC Bold (TrueType).otf"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", size)


F = {
    "title": font(FONT_BOLD, 176),
    "title_small": font(FONT_BOLD, 112),
    "h1": font(FONT_BOLD, 72),
    "h2": font(FONT_BOLD, 52),
    "h3": font(FONT_MED, 38),
    "body": font(FONT_REG, 30),
    "body_sm": font(FONT_REG, 24),
    "label": font(FONT_MED, 26),
    "tiny": font(FONT_REG, 20),
}


def ensure_dirs():
    PUBLIC.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)


def make_bg():
    img = Image.new("RGB", (W, H), COLORS["canvas"])
    draw = ImageDraw.Draw(img)
    for y in range(0, H, 18):
        shade = 236 + (y // 18) % 8
        draw.line([(0, y), (W, y - 120)], fill=(shade, 228, 213), width=1)
    for x in range(-240, W, 320):
        draw.ellipse((x, 180, x + 620, 800), fill="#F8EAD4")
    draw.ellipse((W - 720, 60, W + 300, 1020), fill="#E6EEF2")
    draw.ellipse((-260, H - 900, 760, H + 80), fill="#EAF0E3")
    return img.filter(ImageFilter.GaussianBlur(0.25))


def rounded_rect(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def fit_image(path, size, mode="cover"):
    img = Image.open(path).convert("RGB")
    if mode == "contain":
        img.thumbnail(size, Image.Resampling.LANCZOS)
        bg = Image.new("RGB", size, COLORS["cream_soft"])
        bg.paste(img, ((size[0] - img.width) // 2, (size[1] - img.height) // 2))
        return bg
    return ImageOps.fit(img, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.54))


def paste_round(base, img, box, radius=48):
    x1, y1, x2, y2 = box
    target = img.resize((x2 - x1, y2 - y1), Image.Resampling.LANCZOS)
    mask = Image.new("L", target.size, 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle((0, 0, target.width, target.height), radius=radius, fill=255)
    base.paste(target, (x1, y1), mask)


def text_size(draw, text, font_obj):
    box = draw.textbbox((0, 0), text, font=font_obj)
    return box[2] - box[0], box[3] - box[1]


def wrap_text(draw, text, font_obj, max_width):
    lines = []
    current = ""
    for char in text:
        candidate = current + char
        if char == "\n":
            lines.append(current)
            current = ""
        elif text_size(draw, candidate, font_obj)[0] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = char
    if current:
        lines.append(current)
    return lines


def draw_wrapped(draw, xy, text, font_obj, fill, max_width, line_gap=10):
    x, y = xy
    for line in wrap_text(draw, text, font_obj, max_width):
        draw.text((x, y), line, font=font_obj, fill=fill)
        y += text_size(draw, line, font_obj)[1] + line_gap
    return y


def pill(draw, xy, text, fill, fg=COLORS["ink"], pad_x=28, pad_y=13, font_obj=None):
    font_obj = font_obj or F["body_sm"]
    x, y = xy
    tw, th = text_size(draw, text, font_obj)
    box = (x, y, x + tw + pad_x * 2, y + th + pad_y * 2)
    rounded_rect(draw, box, (th + pad_y * 2) // 2, fill)
    draw.text((x + pad_x, y + pad_y - 3), text, font=font_obj, fill=fg)
    return box[2]


def draw_module_icon(draw, x, y, color, label):
    rounded_rect(draw, (x, y + 36, x + 138, y + 148), 34, color, outline="#D6C5B1", width=2)
    draw.ellipse((x + 24, y, x + 102, y + 78), fill=COLORS["paper"], outline="#D6C5B1", width=2)
    draw.rectangle((x + 94, y + 82, x + 158, y + 116), fill=COLORS["wood_soft"])
    draw.text((x, y + 170), label, font=F["tiny"], fill=COLORS["muted"])


def create_poster():
    img = make_bg()
    draw = ImageDraw.Draw(img)

    draw.text((160, 150), "MOON CAMP", font=F["title"], fill=COLORS["ink"])
    draw.text((170, 340), "面向 4-8 岁儿童的模块化木质故事建构玩具设计", font=F["h3"], fill=COLORS["muted"])
    draw.text((170, 405), "Every child deserves a universe.", font=F["h2"], fill=COLORS["wood_deep"])

    pill(draw, (170, 520), "Wooden", COLORS["paper"])
    pill(draw, (390, 520), "Storytelling", COLORS["paper"])
    pill(draw, (700, 520), "Modular", COLORS["paper"])
    pill(draw, (950, 520), "Open-ended", COLORS["paper"])
    pill(draw, (1275, 520), "Sustainable", COLORS["paper"])

    rounded_rect(draw, (150, 660, W - 150, 2730), 90, COLORS["paper"], outline="#E0D0BD", width=3)
    render = fit_image(FINAL_RENDER, (W - 300, 2070), "cover")
    paste_round(img, render, (150, 660, W - 150, 2730), 90)

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rounded_rectangle((230, 2470, W - 230, 2670), radius=52, fill=(255, 253, 245, 226))
    img.alpha_composite(overlay) if img.mode == "RGBA" else None
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)
    draw.text((285, 2524), "火箭模块 / 月球基地 / 环形山地形 / 宇航员角色 / 任务卡", font=F["label"], fill=COLORS["ink"])
    draw.text((285, 2578), "自然材料 + 开放式建构 + 亲子故事互动", font=F["body_sm"], fill=COLORS["muted"])

    draw.text((160, 2860), "PRODUCT SYSTEM", font=F["h2"], fill=COLORS["ink"])
    modules = [
        (160, 2960, COLORS["orange"], "火箭"),
        (500, 2960, COLORS["blue"], "基地"),
        (840, 2960, COLORS["wood_soft"], "地形"),
        (1180, 2960, COLORS["sage"], "角色"),
        (1520, 2960, COLORS["cream"], "任务卡"),
    ]
    for x, y, color, label in modules:
        draw_module_icon(draw, x, y, color, label)

    rounded_rect(draw, (160, 3310, W - 160, 3400), 45, COLORS["ink"])
    draw.text((210, 3332), "让儿童在搭建中学习，在探索中表达，在陪伴中创造属于自己的宇宙。", font=F["label"], fill=COLORS["paper"])

    return img


def section_title(draw, x, y, num, title):
    draw.text((x, y), num, font=F["label"], fill=COLORS["wood_deep"])
    draw.text((x + 90, y - 6), title, font=F["h2"], fill=COLORS["ink"])
    return y + 72


def create_board():
    img = make_bg()
    draw = ImageDraw.Draw(img)

    draw.text((130, 115), "MOON CAMP", font=F["title_small"], fill=COLORS["ink"])
    draw.text((132, 250), "模块化木质故事建构玩具设计", font=F["h2"], fill=COLORS["wood_deep"])
    draw.text((132, 320), "4-8 岁儿童 / Wooden / Storytelling / Modular / Sustainable", font=F["body_sm"], fill=COLORS["muted"])

    render = fit_image(FINAL_RENDER, (1000, 1320), "cover")
    rounded_rect(draw, (1320, 110, 2350, 1490), 70, COLORS["paper"], outline="#E0D0BD", width=3)
    paste_round(img, render, (1350, 150, 2320, 1370), 54)
    draw.text((1370, 1405), "最终造型图：完整月球营地玩具系统", font=F["body_sm"], fill=COLORS["muted"])

    left_x, right_x = 130, 1320
    y = 500

    rounded_rect(draw, (left_x, y, 1210, y + 485), 44, COLORS["paper"], outline="#E0D0BD", width=2)
    yy = section_title(draw, left_x + 42, y + 42, "01", "Background")
    text = "许多木质玩具玩法固定，生命周期较短。MOON CAMP 希望通过模块结构与故事任务，持续激发儿童创造力、空间建构能力和语言表达。"
    draw_wrapped(draw, (left_x + 44, yy + 8), text, F["body"], COLORS["muted"], 970, 12)
    for i, label in enumerate(["教育型", "娱乐型", "开放建构"]):
        x = left_x + 70 + i * 330
        rounded_rect(draw, (x, y + 330, x + 250, y + 420), 35, [COLORS["blue"], COLORS["orange"], COLORS["sage"]][i])
        draw.text((x + 55, y + 356), label, font=F["label"], fill=COLORS["ink"])

    y2 = 1040
    rounded_rect(draw, (left_x, y2, 1210, y2 + 560), 44, COLORS["paper"], outline="#E0D0BD", width=2)
    yy = section_title(draw, left_x + 42, y2 + 42, "02", "User Insight")
    insights = ["喜欢角色扮演", "喜欢搭建组合", "喜欢讲故事", "需要低屏幕陪伴"]
    for i, label in enumerate(insights):
        x = left_x + 60 + (i % 2) * 520
        yy2 = yy + 30 + (i // 2) * 170
        rounded_rect(draw, (x, yy2, x + 460, yy2 + 125), 32, COLORS["cream_soft"], outline="#E0D0BD", width=1)
        draw.ellipse((x + 28, yy2 + 30, x + 86, yy2 + 88), fill=[COLORS["orange"], COLORS["wood"], COLORS["blue"], COLORS["sage"]][i])
        draw.text((x + 110, yy2 + 38), label, font=F["label"], fill=COLORS["ink"])

    y3 = 1660
    rounded_rect(draw, (left_x, y3, 1210, y3 + 760), 44, COLORS["paper"], outline="#E0D0BD", width=2)
    yy = section_title(draw, left_x + 42, y3 + 42, "03", "Product System")
    modules = [
        ("火箭模块", "可打开舱门，放置角色。", COLORS["orange"]),
        ("月球基地模块", "磁吸或榫卯连接，自由扩展。", COLORS["blue"]),
        ("地形模块", "环形山、岩石、能源站、停机坪。", COLORS["wood_soft"]),
        ("角色模块", "宇航员、机器人、探测车、外星生物。", COLORS["sage"]),
        ("任务卡模块", "探索、修理、收集、营救。", COLORS["cream"]),
    ]
    for i, (title, desc, color) in enumerate(modules):
        x = left_x + 60 + (i % 2) * 520
        yy2 = yy + 20 + (i // 2) * 150
        rounded_rect(draw, (x, yy2, x + 460, yy2 + 120), 28, COLORS["cream_soft"], outline="#E0D0BD", width=1)
        draw.rounded_rectangle((x + 28, yy2 + 30, x + 90, yy2 + 92), radius=20, fill=color)
        draw.text((x + 112, yy2 + 24), title, font=F["label"], fill=COLORS["ink"])
        draw.text((x + 112, yy2 + 66), desc, font=F["tiny"], fill=COLORS["muted"])

    y4 = 2470
    rounded_rect(draw, (left_x, y4, 1210, y4 + 710), 44, COLORS["paper"], outline="#E0D0BD", width=2)
    yy = section_title(draw, left_x + 42, y4 + 42, "04", "Core Play")
    steps = ["搭建基地", "选择角色", "抽取任务", "开始探索", "讲述故事", "重新组合"]
    for i, step in enumerate(steps):
        x = left_x + 72 + (i % 3) * 330
        yy2 = yy + 38 + (i // 3) * 210
        draw.ellipse((x, yy2, x + 118, yy2 + 118), fill=COLORS["ink"])
        draw.text((x + 40, yy2 + 38), f"{i+1}", font=F["h3"], fill=COLORS["paper"])
        draw.text((x - 18, yy2 + 140), step, font=F["body_sm"], fill=COLORS["muted"])

    ry = 1540
    rounded_rect(draw, (right_x, ry, 2350, ry + 520), 44, COLORS["paper"], outline="#E0D0BD", width=2)
    yy = section_title(draw, right_x + 42, ry + 42, "05", "CMF")
    cmf = [
        ("原木色", COLORS["wood"]),
        ("月岩白", "#F7F1E7"),
        ("雾蓝", COLORS["blue"]),
        ("暖橙", COLORS["orange"]),
        ("鼠尾草绿", COLORS["sage"]),
    ]
    for i, (name, color) in enumerate(cmf):
        x = right_x + 58 + i * 185
        draw.rounded_rectangle((x, yy + 32, x + 130, yy + 162), radius=34, fill=color, outline="#D6C5B1", width=2)
        draw.text((x, yy + 192), name, font=F["tiny"], fill=COLORS["muted"])
    draw_wrapped(draw, (right_x + 58, yy + 270), "FSC 认证榉木 / 水性环保漆 / 食品级硅胶 / 隐藏式磁吸件", F["body_sm"], COLORS["muted"], 850, 8)

    ry2 = 2120
    rounded_rect(draw, (right_x, ry2, 2350, ry2 + 520), 44, COLORS["paper"], outline="#E0D0BD", width=2)
    yy = section_title(draw, right_x + 42, ry2 + 42, "06", "Safety")
    safety = ["R8 倒角", "大尺寸防误吞", "无外露磁珠", "水性环保漆", "细磨砂表面", "稳定结构"]
    for i, item in enumerate(safety):
        x = right_x + 58 + (i % 2) * 450
        yy2 = yy + 30 + (i // 2) * 105
        draw.rounded_rectangle((x, yy2, x + 390, yy2 + 74), radius=26, fill=COLORS["cream_soft"], outline="#E0D0BD", width=1)
        draw.text((x + 28, yy2 + 20), item, font=F["body_sm"], fill=COLORS["muted"])

    ry3 = 2700
    rounded_rect(draw, (right_x, ry3, 2350, ry3 + 480), 44, COLORS["ink"])
    draw.text((right_x + 58, ry3 + 54), "Final Summary", font=F["h2"], fill=COLORS["paper"])
    summary = "MOON CAMP 不是一个单一玩法的木质玩具，而是一个可以被不断重新组合的故事世界。"
    draw_wrapped(draw, (right_x + 58, ry3 + 150), summary, F["body"], COLORS["paper"], 860, 14)
    for i, item in enumerate(["空间认知", "逻辑能力", "语言表达", "创造能力"]):
        pill(draw, (right_x + 58 + i * 215, ry3 + 335), item, "#4A4338", COLORS["paper"], 20, 10, F["tiny"])

    draw.text((130, H - 140), "Every child deserves a universe.", font=F["h2"], fill=COLORS["wood_deep"])
    draw.text((130, H - 82), "Product Design / Wooden Toy / Open-ended Construction", font=F["body_sm"], fill=COLORS["muted"])

    return img


def save_pdf_from_png(png_path, pdf_path):
    c = canvas.Canvas(str(pdf_path), pagesize=A3)
    page_w, page_h = A3
    c.drawImage(str(png_path), 0, 0, width=page_w, height=page_h)
    c.showPage()
    c.save()


def save_asset(name, img):
    out_png = OUT / f"{name}.png"
    out_pdf = OUT / f"{name}.pdf"
    pub_png = PUBLIC / f"{name}.png"
    pub_pdf = PUBLIC / f"{name}.pdf"
    img.save(out_png, "PNG", optimize=True)
    save_pdf_from_png(out_png, out_pdf)
    shutil.copy2(out_png, pub_png)
    shutil.copy2(out_pdf, pub_pdf)
    return out_png, out_pdf, pub_png, pub_pdf


def main():
    ensure_dirs()
    if not FINAL_RENDER.exists():
        raise FileNotFoundError(f"Missing final render: {FINAL_RENDER}")

    poster = create_poster()
    board = create_board()
    outputs = [
        *save_asset("mooncamp-a3-poster", poster),
        *save_asset("mooncamp-a3-board", board),
    ]
    for path in outputs:
        print(path)


if __name__ == "__main__":
    main()
