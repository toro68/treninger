#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PDF_PATH="${1:-/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/50Small-SidedGames.pdf}"
SOURCE_TS="$ROOT_DIR/src/data/worldclass-exercises.ts"
OUT_DIR="$ROOT_DIR/public/book-illustrations/50-small-sided-games"
MANIFEST_PATH="$ROOT_DIR/docs/books/illustrations/50-small-sided-games-manifest.json"

if [[ ! -f "$PDF_PATH" ]]; then
  echo "Fant ikke PDF: $PDF_PATH" >&2
  exit 1
fi

if ! command -v pdfimages >/dev/null 2>&1; then
  echo "Mangler pdfimages (poppler)." >&2
  exit 1
fi
if ! command -v pdftocairo >/dev/null 2>&1; then
  echo "Mangler pdftocairo (poppler)." >&2
  exit 1
fi
if ! command -v magick >/dev/null 2>&1; then
  echo "Mangler magick (ImageMagick)." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"
mkdir -p "$(dirname "$MANIFEST_PATH")"

pages=()
while IFS= read -r page; do
  pages+=("$page")
done < <(rg -o "WorldClass s\\.[0-9]+" "$SOURCE_TS" | sed -E 's/.*s\.([0-9]+)/\1/' | sort -n | uniq)

if [[ ${#pages[@]} -eq 0 ]]; then
  echo "Fant ingen WorldClass-sider i $SOURCE_TS" >&2
  exit 1
fi

tmp_root="$(mktemp -d /tmp/worldclass50.XXXXXX)"
trap 'rm -rf "$tmp_root"' EXIT

# Start manifest
cat > "$MANIFEST_PATH" <<JSON
{
  "book": "50-small-sided-games",
  "pdf": "${PDF_PATH}",
  "generatedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "pages": [
JSON

first=1
for page in "${pages[@]}"; do
  page_dir="$tmp_root/p$page"
  mkdir -p "$page_dir"

  pdfimages -f "$page" -l "$page" -all "$PDF_PATH" "$page_dir/i" >/dev/null 2>&1 || true

  if ls "$page_dir"/i-* >/dev/null 2>&1; then
    best_line="$(magick identify -format '%w %h %[fx:w*h] %b %i\n' "$page_dir"/i-* | sort -k3,3nr | head -n 1)"
    best_path="$(printf '%s\n' "$best_line" | awk '{print $5}')"
    width="$(printf '%s\n' "$best_line" | awk '{print $1}')"
    height="$(printf '%s\n' "$best_line" | awk '{print $2}')"
    area="$(printf '%s\n' "$best_line" | awk '{print $3}')"
    mode="embedded-image"
  else
    # Fallback: siden er vektorbasert uten innebygde rasterbilder.
    pdftocairo -png -singlefile -f "$page" -l "$page" -scale-to 1400 "$PDF_PATH" "$page_dir/page" >/dev/null 2>&1
    best_path="$page_dir/page.png"
    width="$(magick identify -format '%w' "$best_path")"
    height="$(magick identify -format '%h' "$best_path")"
    area="$((width * height))"
    mode="rendered-page"
  fi

  out_file="$OUT_DIR/s$(printf '%03d' "$page").webp"
  magick "$best_path" -strip -quality 75 "$out_file"

  bytes="$(stat -f %z "$out_file")"

  if [[ $first -eq 0 ]]; then
    echo "," >> "$MANIFEST_PATH"
  fi
  first=0

  cat >> "$MANIFEST_PATH" <<JSON
    {
      "page": $page,
      "imageUrl": "/book-illustrations/50-small-sided-games/s$(printf '%03d' "$page").webp",
      "width": $width,
      "height": $height,
      "area": $area,
      "bytes": $bytes,
      "mode": "$mode"
    }
JSON

  echo "OK side $page -> $(basename "$out_file") (${width}x${height}, ${bytes} bytes, $mode)"
done

cat >> "$MANIFEST_PATH" <<'JSON'
  ]
}
JSON

echo "Ferdig: $OUT_DIR"
echo "Manifest: $MANIFEST_PATH"
