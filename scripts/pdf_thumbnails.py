#   from pdf2image import convert_from_path
from pathlib import Path
#
#   poppler_path = r"C:\poppler-26.02.0\Library\bin"
#
#   pdf_dir   = Path("public/certificates/pdfs")
#   thumb_dir = Path("public/certificates/images")
#   thumb_dir.mkdir(parents=True, exist_ok=True)

#   for pdf in pdf_dir.glob("*.pdf"):
#       out = thumb_dir / (pdf.stem + ".webp")
#       if out.exists():
#           print(f"skipping {pdf.stem} — already exists")
#           continue
#       try:
#           pages = convert_from_path(pdf, dpi=150, first_page=1, last_page=1,
#                                  poppler_path=poppler_path)
#           pages[0].save(out, "WEBP", quality=85)
#           print(f"✓ {out.name}")
#       except Exception as e:
#           print(f"✗ {pdf.stem}: {e}")