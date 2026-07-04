from pathlib import Path
import shutil
import textwrap

from PIL import Image, ImageOps
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ASSETS_A = PUBLIC / "moon-camp-assets"
ASSETS_B = PUBLIC / "mooncamp-assets"
OUT = ROOT / "deliverables" / "pdf"
TMP = ROOT / "tmp" / "pdfs" / "mooncamp"
DEPLOY_PUBLIC = ROOT / "deliverables" / "vercel-upload-ready" / "public" / "mooncamp-assets"

PDF_NAME = "MOON-CAMP-portfolio.pdf"
PAGE_W, PAGE_H = landscape(A4)

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
}

FONT_PATHS = [
    "C:/Windows/Fonts/simhei.ttf",
    "C:/Windows/Fonts/msyh.ttc",
    "C:/Windows/Fonts/simsun.ttc",
]


def font_path():
    for path in FONT_PATHS:
        p = Path(path)
        if p.exists():
            return str(p)
    raise FileNotFoundError("No Chinese font found. Expected simhei.ttf, msyh.ttc, or simsun.ttc.")


def register_fonts():
    pdfmetrics.registerFont(TTFont("MoonSans", font_path()))


def color(name):
    return HexColor(COLORS[name])


def setup_dirs():
    OUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    DEPLOY_PUBLIC.mkdir(parents=True, exist_ok=True)


def y(top, height=0):
    return PAGE_H - top - height


def set_font(c, size, fill="ink"):
    c.setFont("MoonSans", size)
    c.setFillColor(color(fill))


def text_width(text, size):
    return pdfmetrics.stringWidth(text, "MoonSans", size)


def wrap(text, size, width):
    lines = []
    for paragraph in text.split("\n"):
        current = ""
        for char in paragraph:
            trial = current + char
            if text_width(trial, size) <= width:
                current = trial
            else:
                if current:
                    lines.append(current)
                current = char
        if current:
            lines.append(current)
    return lines


def draw_text(c, x, top, text, size=12, fill="ink", max_width=None, leading=None, align="left"):
    set_font(c, size, fill)
    leading = leading or size * 1.45
    lines = wrap(text, size, max_width) if max_width else [text]
    for line in lines:
        tx = x
        if align == "center":
            tx = x - text_width(line, size) / 2
        elif align == "right":
            tx = x - text_width(line, size)
        c.drawString(tx, y(top + size), line)
        top += leading
    return top


def draw_bg(c):
    c.setFillColor(color("canvas"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(HexColor("#F8EAD4"))
    c.circle(110, PAGE_H - 120, 130, fill=1, stroke=0)
    c.setFillColor(HexColor("#E6EEF2"))
    c.circle(PAGE_W - 95, PAGE_H - 85, 150, fill=1, stroke=0)
    c.setFillColor(HexColor("#EAF0E3"))
    c.circle(PAGE_W - 210, 95, 170, fill=1, stroke=0)


def round_rect(c, x, top, w, h, fill="paper", stroke="line", radius=16, line_width=0.8):
    c.setFillColor(color(fill))
    c.setStrokeColor(color(stroke))
    c.setLineWidth(line_width)
    c.roundRect(x, y(top, h), w, h, radius, fill=1, stroke=1)


def pill(c, x, top, label, fill="paper", fg="muted"):
    size = 9.5
    tw = text_width(label, size)
    h = 24
    round_rect(c, x, top, tw + 24, h, fill=fill, stroke="line", radius=12, line_width=0.5)
    draw_text(c, x + 12, top + 6, label, size=size, fill=fg)
    return x + tw + 34


def crop_image(src, width_pt, height_pt, mode="cover"):
    src = Path(src)
    key = f"{src.stem}-{int(width_pt)}x{int(height_pt)}-{mode}.jpg"
    out = TMP / key
    if out.exists():
        return out
    img = Image.open(src).convert("RGB")
    px_size = (int(width_pt * 2.4), int(height_pt * 2.4))
    if mode == "contain":
        img.thumbnail(px_size, Image.Resampling.LANCZOS)
        bg = Image.new("RGB", px_size, COLORS["cream_soft"])
        bg.paste(img, ((px_size[0] - img.width) // 2, (px_size[1] - img.height) // 2))
        img = bg
    else:
        img = ImageOps.fit(img, px_size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.52))
    img.save(out, "JPEG", quality=92, optimize=True)
    return out


def image_box(c, src, x, top, w, h, mode="cover", caption=None):
    round_rect(c, x, top, w, h, fill="cream_soft", stroke="line", radius=18)
    cropped = crop_image(src, w, h, mode)
    c.drawImage(str(cropped), x, y(top, h), w, h, preserveAspectRatio=False, mask="auto")
    c.setStrokeColor(color("line"))
    c.setLineWidth(0.8)
    c.roundRect(x, y(top, h), w, h, 18, fill=0, stroke=1)
    if caption:
        draw_text(c, x, top + h + 9, caption, size=8.5, fill="muted", max_width=w)


def footer(c, page, section):
    set_font(c, 8.5, "muted")
    c.drawString(42, 24, "MOON CAMP / 产品设计-2302班 / 金晓俊")
    c.drawRightString(PAGE_W - 42, 24, f"{page:02d}  {section}")


def page_header(c, kicker, title, lead=None):
    draw_text(c, 42, 34, kicker, size=9.5, fill="wood_deep")
    draw_text(c, 42, 55, title, size=25, fill="ink")
    if lead:
        draw_text(c, 42, 93, lead, size=11, fill="muted", max_width=520, leading=17)


def card(c, x, top, w, h, title, body, accent="wood_soft"):
    round_rect(c, x, top, w, h, fill="paper", stroke="line", radius=17)
    c.setFillColor(color(accent))
    c.roundRect(x + 15, y(top + 18, 28), 28, 28, 10, fill=1, stroke=0)
    draw_text(c, x + 55, top + 18, title, size=12.5, fill="ink", max_width=w - 72)
    draw_text(c, x + 15, top + 58, body, size=9.2, fill="muted", max_width=w - 30, leading=13.5)


def cover(c):
    draw_bg(c)
    image_box(c, ASSETS_B / "final-toy-render.png", 510, 48, 265, 470, mode="cover")
    draw_text(c, 54, 70, "MOON CAMP", size=56, fill="ink")
    draw_text(c, 58, 145, "面向 4-8 岁儿童的模块化木质故事建构玩具设计", size=19, fill="ink", max_width=390, leading=27)
    draw_text(c, 58, 220, "Every child deserves a universe.", size=20, fill="wood_deep")
    top = 275
    x = 58
    for label, fill, fg in [
        ("产品设计-2302班", "ink", "paper"),
        ("金晓俊", "paper", "ink"),
        ("Wooden", "cream_soft", "muted"),
        ("Storytelling", "cream_soft", "muted"),
        ("Modular", "cream_soft", "muted"),
        ("Open-ended", "cream_soft", "muted"),
    ]:
        x = pill(c, x, top, label, fill, fg)
        if x > 360:
            x = 58
            top += 34
    round_rect(c, 58, 395, 365, 82, fill="ink", stroke="ink", radius=24)
    draw_text(c, 82, 415, "自然材料 / 模块结构 / 开放任务 / 故事表达", size=13, fill="paper", max_width=318)
    draw_text(c, 82, 452, "课程结课作业作品集 PDF", size=10, fill="cream")
    footer(c, 1, "Cover")
    c.showPage()


def overview(c):
    draw_bg(c)
    page_header(c, "01 / Project Overview", "从木质玩具到可持续故事系统", "MOON CAMP 将建构、角色扮演与任务叙事结合，让玩具在反复拼接和重新讲述中延长生命周期。")
    items = [
        ("项目类型", "产品设计 / 木质玩具 / 儿童教育 / 开放式建构"),
        ("目标用户", "4-8 岁儿童"),
        ("核心用户", "5-6 岁儿童"),
        ("设计周期", "课程结课作业"),
    ]
    for i, (title, body) in enumerate(items):
        card(c, 42 + (i % 2) * 185, 165 + (i // 2) * 128, 165, 100, title, body, ["wood_soft", "blue", "sage", "orange"][i])
    image_box(c, ASSETS_A / "product-system.png", 435, 145, 345, 240, mode="cover", caption="产品系统图：火箭、基地、地形、角色、探测车和任务卡共同构成月球营地。")
    draw_text(c, 42, 440, "设计关键词", size=15, fill="ink")
    x = 42
    for label in ["Wooden", "Storytelling", "Modular", "Open-ended", "Sustainable"]:
        x = pill(c, x, 474, label, "paper", "muted")
    footer(c, 2, "Overview")
    c.showPage()


def research(c):
    draw_bg(c)
    page_header(c, "02 / Background & Insight", "固定玩法之外，儿童需要能持续展开的小世界")
    round_rect(c, 42, 120, 350, 205, fill="paper", stroke="line", radius=18)
    bg_text = "目前木质玩具主要分为教育型和娱乐型两类。教育型玩具强调认知训练，如蒙氏教具、拼图、数学积木；娱乐型玩具强调场景乐趣，如木质小火车、场景屋和角色玩具。但许多木质玩具玩法较固定，生命周期较短，孩子玩几次后容易失去兴趣。"
    draw_text(c, 64, 145, bg_text, size=10.5, fill="muted", max_width=306, leading=16)
    insights = [
        ("喜欢角色扮演", "儿童会主动给玩具设定身份和剧情。", "orange"),
        ("喜欢搭建组合", "儿童喜欢通过拼装建立自己的小世界。", "wood_soft"),
        ("喜欢讲故事", "儿童常通过玩具表达想象与情绪。", "blue"),
        ("需要低屏幕陪伴", "家长希望玩具能减少孩子对电子屏幕的依赖。", "sage"),
    ]
    for i, (title, body, accent) in enumerate(insights):
        card(c, 42 + (i % 2) * 185, 360 + (i // 2) * 100, 165, 78, title, body, accent)
    image_box(c, ASSETS_A / "independent-play.png", 430, 120, 350, 330, mode="cover", caption="独立游戏观察：孩子会将模块组合成自己的月面基地，并赋予角色行动目标。")
    footer(c, 3, "Research")
    c.showPage()


def opportunity_concept(c):
    draw_bg(c)
    page_header(c, "03 / Opportunity & Concept", "把重复游玩率转化为开放式故事机制")
    questions = [
        "如何提升木质玩具的重复游玩率？",
        "如何鼓励儿童进行开放式创造？",
        "如何促进亲子之间的故事互动？",
        "如何在非电子产品中建立持续吸引力？",
    ]
    for i, q in enumerate(questions):
        round_rect(c, 42 + (i % 2) * 190, 130 + (i // 2) * 98, 170, 72, fill="paper", stroke="line", radius=17)
        draw_text(c, 62 + (i % 2) * 190, 150 + (i // 2) * 98, f"HMW 0{i + 1}", size=9.5, fill="wood_deep")
        draw_text(c, 62 + (i % 2) * 190, 177 + (i // 2) * 98, q, size=10.5, fill="ink", max_width=130, leading=14)
    round_rect(c, 42, 350, 360, 145, fill="ink", stroke="ink", radius=22)
    draw_text(c, 66, 378, "Concept: MOON CAMP", size=18, fill="paper")
    concept = "MOON CAMP 是一套面向 4-8 岁儿童的模块化木质故事建构玩具。它以月球营地为主题，通过火箭、基地、地形、角色和任务卡等模块，鼓励儿童自由搭建、探索和讲述故事。"
    draw_text(c, 66, 420, concept, size=10.3, fill="cream", max_width=310, leading=15)
    image_box(c, ASSETS_B / "final-toy-render.png", 455, 95, 290, 410, mode="cover")
    footer(c, 4, "Concept")
    c.showPage()


def product_system(c):
    draw_bg(c)
    page_header(c, "04 / Product System", "五类模块共同构成可扩展的故事建构系统")
    image_box(c, ASSETS_A / "product-system.png", 42, 110, 375, 255, mode="cover")
    modules = [
        ("火箭模块", "可打开舱门，内部可放置角色。", "orange"),
        ("月球基地模块", "通过磁吸或榫卯结构连接，可自由扩展。", "blue"),
        ("地形模块", "包含环形山、岩石、能源站、停机坪。", "wood_soft"),
        ("角色模块", "包含宇航员、工程机器人、探测车、外星生物。", "sage"),
        ("任务卡模块", "提供探索、修理、收集、营救等故事任务。", "cream"),
    ]
    for i, (title, body, accent) in enumerate(modules):
        card(c, 455, 105 + i * 82, 292, 64, title, body, accent)
    footer(c, 5, "Product System")
    c.showPage()


def play_scenario(c):
    draw_bg(c)
    page_header(c, "05 / Core Play & Scenario", "从搭建到讲述，形成循环式游戏体验")
    steps = ["搭建基地", "选择角色", "抽取任务", "开始探索", "讲述故事", "重新组合"]
    for i, step in enumerate(steps):
        x = 52 + i * 122
        c.setFillColor(color("ink"))
        c.circle(x + 28, y(137), 28, fill=1, stroke=0)
        draw_text(c, x + 28, 122, str(i + 1), size=16, fill="paper", align="center")
        draw_text(c, x + 28, 178, step, size=10.5, fill="muted", align="center")
        if i < len(steps) - 1:
            c.setStrokeColor(color("wood"))
            c.setLineWidth(1.2)
            c.line(x + 58, y(137), x + 112, y(137))
    scenarios = [
        ("独立游戏", "孩子独自搭建基地，发展空间认知。", ASSETS_A / "independent-play.png"),
        ("亲子互动", "父母与孩子共同完成任务，促进表达和陪伴。", ASSETS_A / "parent-child-play.png"),
        ("多人合作", "朋友之间共同创造故事，提高合作能力。", ASSETS_A / "multi-play.png"),
    ]
    for i, (title, body, img) in enumerate(scenarios):
        x = 42 + i * 255
        image_box(c, img, x, 250, 225, 150, mode="cover")
        draw_text(c, x, 420, title, size=14, fill="ink")
        draw_text(c, x, 447, body, size=9.8, fill="muted", max_width=210, leading=14)
    footer(c, 6, "Play")
    c.showPage()


def detail_cmf(c):
    draw_bg(c)
    page_header(c, "06 / Form, Detail & CMF", "用圆润比例和原木触感建立安全、亲和的太空想象")
    image_box(c, ASSETS_A / "detail-closeup.png", 42, 115, 330, 245, mode="cover")
    details = [
        ("可开启舱门", "火箭和基地预留可放置角色的内部空间。"),
        ("隐藏式连接", "连接件被整合进模块结构，避免外露磁珠。"),
        ("大圆角处理", "边缘采用大 R 角和细磨砂表面。"),
        ("材料触感", "榉木纹理、哑光水性漆与硅胶软部件形成温暖触感。"),
    ]
    for i, (title, body) in enumerate(details):
        card(c, 405 + (i % 2) * 178, 120 + (i // 2) * 112, 158, 88, title, body, ["wood_soft", "blue", "orange", "sage"][i])
    draw_text(c, 42, 400, "CMF 色彩与材料", size=16, fill="ink")
    colors = [
        ("Natural Wood", "原木色", "#C99A61"),
        ("Moon White", "月岩白", "#F7F1E7"),
        ("Sky Blue", "雾蓝", "#AFC7D8"),
        ("Warm Orange", "暖橙", "#EAA45C"),
        ("Sage Green", "鼠尾草绿", "#A7B89D"),
    ]
    for i, (en, cn, hex_color) in enumerate(colors):
        x = 42 + i * 150
        c.setFillColor(HexColor(hex_color))
        c.roundRect(x, y(442, 48), 112, 48, 14, fill=1, stroke=0)
        draw_text(c, x, 502, en, size=8.3, fill="muted")
        draw_text(c, x, 520, cn, size=10, fill="ink")
    footer(c, 7, "Detail")
    c.showPage()


def safety_value(c):
    draw_bg(c)
    page_header(c, "07 / Safety & Education Value", "轻教育不是说教，而是在游戏中自然发生")
    safety = ["所有边缘 R8 倒角", "零件尺寸大于儿童误吞风险尺寸", "无外露磁珠", "使用水性环保漆", "表面细磨砂处理", "可拆卸清洁", "结构稳定，不易倾倒"]
    for i, item in enumerate(safety):
        x = 42 + (i % 2) * 205
        top = 128 + (i // 2) * 58
        round_rect(c, x, top, 182, 42, fill="paper", stroke="line", radius=15)
        draw_text(c, x + 16, top + 14, item, size=9.5, fill="muted", max_width=150)
    values = [
        ("空间认知", "通过基地拼接理解空间关系。"),
        ("逻辑能力", "通过任务卡理解因果和顺序。"),
        ("语言表达", "通过角色扮演组织故事。"),
        ("创造能力", "通过开放组合形成不同玩法。"),
    ]
    for i, (title, body) in enumerate(values):
        card(c, 470, 125 + i * 80, 270, 62, title, body, ["blue", "orange", "sage", "wood_soft"][i])
    image_box(c, ASSETS_A / "parent-child-play.png", 42, 405, 330, 120, mode="cover")
    draw_text(c, 405, 420, "产品价值", size=16, fill="ink")
    value_text = "用户价值：提升儿童创造力、表达能力和动手能力。\n家长价值：提供低屏幕、高陪伴、可持续的玩具选择。\n商业价值：可扩展火星探索包、深海探索包、恐龙世界包、城市建造包等系列。"
    draw_text(c, 405, 455, value_text, size=10.5, fill="muted", max_width=330, leading=17)
    footer(c, 8, "Value")
    c.showPage()


def final_page(c):
    draw_bg(c)
    image_box(c, ASSETS_B / "mooncamp-a3-board.png", 42, 55, 235, 335, mode="contain", caption="A3 展板预览")
    image_box(c, ASSETS_B / "mooncamp-a3-poster.png", 300, 55, 235, 335, mode="contain", caption="A3 海报预览")
    round_rect(c, 560, 65, 225, 315, fill="ink", stroke="ink", radius=24)
    draw_text(c, 585, 96, "Final Summary", size=21, fill="paper")
    summary = "MOON CAMP 不是一个单一玩法的木质玩具，而是一个可以被不断重新组合的故事世界。它希望通过自然材料、模块结构和开放式任务，让儿童在搭建中学习，在探索中表达，在陪伴中创造属于自己的宇宙。"
    draw_text(c, 585, 145, summary, size=11.2, fill="cream", max_width=178, leading=18)
    x = 585
    pill_top = 310
    for label in ["Natural material", "Modular system", "Open task", "Story expression"]:
        x = pill(c, x, pill_top, label, "paper", "muted")
        if x > 720:
            x = 585
            pill_top += 30
    draw_text(c, PAGE_W / 2, 468, "Every child deserves a universe.", size=22, fill="wood_deep", align="center")
    draw_text(c, PAGE_W / 2, 508, "产品设计-2302班 / 金晓俊", size=12.5, fill="muted", align="center")
    footer(c, 9, "Summary")
    c.showPage()


def build_pdf():
    setup_dirs()
    register_fonts()
    pdf_path = OUT / PDF_NAME
    c = canvas.Canvas(str(pdf_path), pagesize=landscape(A4))
    c.setTitle("MOON CAMP Portfolio")
    cover(c)
    overview(c)
    research(c)
    opportunity_concept(c)
    product_system(c)
    play_scenario(c)
    detail_cmf(c)
    safety_value(c)
    final_page(c)
    c.save()
    public_pdf = ASSETS_B / "mooncamp-portfolio.pdf"
    deploy_pdf = DEPLOY_PUBLIC / "mooncamp-portfolio.pdf"
    shutil.copy2(pdf_path, public_pdf)
    shutil.copy2(pdf_path, deploy_pdf)
    return pdf_path, public_pdf, deploy_pdf


if __name__ == "__main__":
    for path in build_pdf():
        print(path)
