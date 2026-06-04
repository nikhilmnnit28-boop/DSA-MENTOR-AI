from pathlib import Path
import re
import textwrap


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "react-login-notes.md"
OUTPUT = ROOT / "docs" / "react-login-notes.pdf"


def clean_text(text):
    text = text.replace("`", "")
    text = text.replace("->", "->")
    text = text.replace("’", "'").replace("“", '"').replace("”", '"')
    return text.encode("latin-1", "replace").decode("latin-1")


def escape_pdf(text):
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def markdown_to_lines(markdown):
    lines = []
    in_code = False

    for raw_line in markdown.splitlines():
        line = raw_line.rstrip()

        if line.startswith("```"):
            in_code = not in_code
            lines.append({"text": "", "style": "normal"})
            continue

        if in_code:
            lines.append({"text": clean_text(line), "style": "code"})
            continue

        if not line:
            lines.append({"text": "", "style": "normal"})
            continue

        if line.startswith("# "):
            lines.append({"text": clean_text(line[2:]), "style": "title"})
        elif line.startswith("## "):
            lines.append({"text": clean_text(line[3:]), "style": "heading"})
        elif line.startswith("### "):
            lines.append({"text": clean_text(line[4:]), "style": "subheading"})
        elif line.startswith("> "):
            lines.append({"text": clean_text(line[2:]), "style": "quote"})
        elif line.startswith("- "):
            lines.append({"text": clean_text("- " + line[2:]), "style": "normal"})
        else:
            lines.append({"text": clean_text(re.sub(r"\*\*(.*?)\*\*", r"\1", line)), "style": "normal"})

    return lines


def wrap_lines(items):
    wrapped = []

    for item in items:
        text = item["text"]
        style = item["style"]

        if not text:
            wrapped.append(item)
            continue

        width = 78
        if style in {"title", "heading"}:
            width = 64
        elif style == "code":
            width = 86

        for part in textwrap.wrap(text, width=width, replace_whitespace=False):
            wrapped.append({"text": part, "style": style})

    return wrapped


def paginate(lines):
    pages = []
    page = []
    y = 760

    spacing = {
        "title": 28,
        "heading": 24,
        "subheading": 20,
        "normal": 16,
        "quote": 16,
        "code": 14,
    }

    for line in lines:
        gap = spacing[line["style"]]
        if y - gap < 54:
            pages.append(page)
            page = []
            y = 760
        page.append((line, y))
        y -= gap

    if page:
        pages.append(page)

    return pages


def content_stream(page, page_number):
    commands = ["BT"]

    for line, y in page:
        style = line["style"]
        text = escape_pdf(line["text"])

        if style == "title":
            font, size, x = "F1", 22, 54
        elif style == "heading":
            font, size, x = "F1", 15, 54
        elif style == "subheading":
            font, size, x = "F1", 12, 54
        elif style == "code":
            font, size, x = "F2", 9, 64
        else:
            font, size, x = "F3", 10, 54

        if style == "quote":
            x = 66

        commands.append(f"/{font} {size} Tf")
        commands.append(f"{x} {y} Td ({text}) Tj")
        commands.append(f"{-x} {-y} Td")

    commands.append("/F3 9 Tf")
    commands.append(f"520 28 Td ({page_number}) Tj")
    commands.append("ET")
    return "\n".join(commands).encode("latin-1", "replace")


def build_pdf(pages):
    objects = []

    def add_object(body):
        objects.append(body)
        return len(objects)

    catalog_id = add_object("<< /Type /Catalog /Pages 2 0 R >>")
    pages_id = add_object("")
    font_bold_id = add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    font_mono_id = add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>")
    font_regular_id = add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    page_ids = []

    for index, page in enumerate(pages, start=1):
        stream = content_stream(page, index)
        stream_id = add_object(
            f"<< /Length {len(stream)} >>\nstream\n"
            + stream.decode("latin-1")
            + "\nendstream"
        )
        page_id = add_object(
            f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 612 792] "
            f"/Resources << /Font << /F1 {font_bold_id} 0 R /F2 {font_mono_id} 0 R /F3 {font_regular_id} 0 R >> >> "
            f"/Contents {stream_id} 0 R >>"
        )
        page_ids.append(page_id)

    objects[pages_id - 1] = (
        f"<< /Type /Pages /Kids [{' '.join(f'{page_id} 0 R' for page_id in page_ids)}] "
        f"/Count {len(page_ids)} >>"
    )

    pdf = bytearray(b"%PDF-1.4\n")
    offsets = [0]

    for object_id, body in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{object_id} 0 obj\n{body}\nendobj\n".encode("latin-1"))

    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("latin-1"))
    pdf.extend(b"0000000000 65535 f \n")

    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("latin-1"))

    pdf.extend(
        f"trailer\n<< /Size {len(objects) + 1} /Root {catalog_id} 0 R >>\n"
        f"startxref\n{xref_offset}\n%%EOF\n".encode("latin-1")
    )

    return pdf


def main():
    markdown = SOURCE.read_text(encoding="utf-8")
    lines = wrap_lines(markdown_to_lines(markdown))
    pages = paginate(lines)
    OUTPUT.write_bytes(build_pdf(pages))
    print(f"Created {OUTPUT}")


if __name__ == "__main__":
    main()
