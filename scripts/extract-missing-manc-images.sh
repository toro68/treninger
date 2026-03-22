#!/bin/bash
# Kjør dette skriptet fra dev/treninger/treninger-mappen
# Det henter 4 manglende illustrasjoner fra Pep Guardiola Vol. 2-boka

PDF="/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/Pep Guardiola. 85 Passing, Rondos, Posession and Circuits Vol. 2 2 (2019, SoccerTutor.com).pdf"
OUTDIR="public/book-illustrations/manc-academy"

# Sjekk at pdftoppm er installert
if ! command -v pdftoppm &> /dev/null; then
    echo "pdftoppm ikke funnet. Installer med: brew install poppler"
    exit 1
fi

# Sjekk at cwebp er installert (for webp-konvertering)
if ! command -v cwebp &> /dev/null; then
    echo "cwebp ikke funnet. Installer med: brew install webp"
    echo "Faller tilbake til PNG..."
    USE_PNG=1
fi

echo "Henter 4 manglende illustrasjoner fra Pep Guardiola Vol. 2..."

# Side 72 (PDF-side) = Dobbel vegg + distanseskudd
echo "  → s. 72: Pasningskombinasjon med dobbel vegg..."
pdftoppm -jpeg -r 200 -f 72 -l 72 "$PDF" /tmp/manc-p072
if [ -z "$USE_PNG" ]; then
    cwebp -q 85 /tmp/manc-p072-*.jpg -o "$OUTDIR/p072-manc-passing-combination-double-one-two-outside-box-shot.webp"
else
    cp /tmp/manc-p072-*.jpg "$OUTDIR/p072-manc-passing-combination-double-one-two-outside-box-shot.jpg"
    echo "    (lagret som .jpg - oppdater image-map om nødvendig)"
fi

# Side 73 (PDF-side) = Pasningskombinasjon rundt boksen
echo "  → s. 73: Pasningskombinasjon rundt boksen..."
pdftoppm -jpeg -r 200 -f 73 -l 73 "$PDF" /tmp/manc-p073
if [ -z "$USE_PNG" ]; then
    cwebp -q 85 /tmp/manc-p073-*.jpg -o "$OUTDIR/p073-manc-passing-combination-around-box-finish.webp"
else
    cp /tmp/manc-p073-*.jpg "$OUTDIR/p073-manc-passing-combination-around-box-finish.jpg"
fi

# Side 95 (PDF-side) = 6v2 rektangel-rondo
echo "  → s. 95: 6v2 rektangel-rondo..."
pdftoppm -jpeg -r 200 -f 95 -l 95 "$PDF" /tmp/manc-p095
if [ -z "$USE_PNG" ]; then
    cwebp -q 85 /tmp/manc-p095-*.jpg -o "$OUTDIR/p095-manc-6v2-rectangle-rondo.webp"
else
    cp /tmp/manc-p095-*.jpg "$OUTDIR/p095-manc-6v2-rectangle-rondo.jpg"
fi

# Side 96 (PDF-side) = 7v2 kvadrat-rondo
echo "  → s. 96: 7v2 kvadrat-rondo..."
pdftoppm -jpeg -r 200 -f 96 -l 96 "$PDF" /tmp/manc-p096
if [ -z "$USE_PNG" ]; then
    cwebp -q 85 /tmp/manc-p096-*.jpg -o "$OUTDIR/p096-manc-7v2-square-rondo.webp"
else
    cp /tmp/manc-p096-*.jpg "$OUTDIR/p096-manc-7v2-square-rondo.jpg"
fi

echo ""
echo "Ferdig! Sjekk at bildene viser riktig innhold:"
echo "  p072 = Dobbel 1-2-kombinasjon + distanseskudd (A→trener→A→C→B→C→B skyter)"
echo "  p073 = Pasningskombinasjon rundt straffefeltet (A→B→C→inn i felt→A scorer)"
echo "  p095 = 6v2 rektangel-rondo (5x10 yards, 2 på kortsider, 1 på langsider)"
echo "  p096 = 7v2 kvadrat-rondo (10x10 yards, 2 på 3 sider, 1 på fjerde)"
echo ""
echo "Merk: Sidenumrene (72, 73, 95, 96) er PDF-sidenummer."
echo "Hvis bildene ikke matcher, prøv å justere +/- 1-2 sider."
ls -la "$OUTDIR"/p07[23]-manc-* "$OUTDIR"/p09[56]-manc-* 2>/dev/null
