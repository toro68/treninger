import fs from 'node:fs/promises';
import path from 'node:path';

type TiimExercise = {
  id: string;
  name: string;
  sourceUrl?: string;
};

const ROOT = process.cwd();
const dataFilePath = path.join(ROOT, 'src', 'data', 'tiim-exercises.ts');
const outputDir = path.join(ROOT, 'public', 'book-illustrations', 'tiim');
const imageMapPath = path.join(ROOT, 'src', 'data', 'tiim-image-map.ts');

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const decodeHtml = (value: string) =>
  value.replace(/&amp;/g, '&').replace(/&#x2F;/g, '/').replace(/&#39;/g, "'");

const absoluteTiimUrl = (value: string) => {
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://')) return decodeHtml(value);
  if (value.startsWith('//')) return `https:${decodeHtml(value)}`;
  if (value.startsWith('/')) return `https://tiim.no${decodeHtml(value)}`;
  return decodeHtml(value);
};

const extractNextDataJson = (html: string) => {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/i);
  if (!match?.[1]) return null;

  try {
    return JSON.parse(match[1]) as {
      props?: {
        pageProps?: {
          drill?: {
            media?: {
              image?: string;
              asset?: {
                resources?: Array<{
                  id?: string;
                  rel?: string[];
                  renditions?: Array<{
                    links?: Array<{
                      href?: string;
                      mimeType?: string;
                    }>;
                  }>;
                }>;
                thumbnails?: Array<{
                  id?: string;
                }>;
              };
            };
          };
        };
      };
    };
  } catch {
    return null;
  }
};

const pickBestAssetImage = (
  resources: Array<{
    id?: string;
    rel?: string[];
    renditions?: Array<{
      links?: Array<{
        href?: string;
        mimeType?: string;
      }>;
    }>;
  }> = [],
  thumbnails: Array<{ id?: string }> = [],
) => {
  const thumbnailIds = new Set(thumbnails.map((thumbnail) => thumbnail.id).filter(Boolean));
  const prioritizedResources = [
    ...resources.filter((resource) => thumbnailIds.has(resource.id)),
    ...resources.filter((resource) => !thumbnailIds.has(resource.id)),
  ];

  for (const resource of prioritizedResources) {
    const sortedRenditions = [...(resource.renditions ?? [])].sort((left, right) => {
      const leftScore = left.links?.some((link) => link.mimeType?.startsWith('image/')) ? 1 : 0;
      const rightScore = right.links?.some((link) => link.mimeType?.startsWith('image/')) ? 1 : 0;
      return rightScore - leftScore;
    });

    for (const rendition of sortedRenditions) {
      for (const link of rendition.links ?? []) {
        if (link.href && link.mimeType?.startsWith('image/')) {
          return absoluteTiimUrl(link.href);
        }
      }
    }
  }

  return null;
};

const extractSrcSetUrl = (html: string) => {
  const match = html.match(/<img[^>]+srcSet="([^"]+)"/i);
  if (!match?.[1]) return null;

  const candidates = decodeHtml(match[1])
    .split(',')
    .map((entry) => entry.trim().split(/\s+/)[0])
    .filter(Boolean);

  return absoluteTiimUrl(candidates.at(-1) ?? candidates[0] ?? '');
};

const extractMetaImage = (html: string) => {
  const match = html.match(/<meta[^>]+property="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/i);
  if (!match?.[1]) return null;
  return absoluteTiimUrl(match[1]);
};

const extractImageSrc = (html: string) => {
  const nextData = extractNextDataJson(html);
  const drillMedia = nextData?.props?.pageProps?.drill?.media;

  if (drillMedia?.image) {
    return absoluteTiimUrl(drillMedia.image);
  }

  const assetImage = pickBestAssetImage(drillMedia?.asset?.resources, drillMedia?.asset?.thumbnails);
  if (assetImage) return assetImage;

  const srcSetImage = extractSrcSetUrl(html);
  if (srcSetImage) return srcSetImage;

  const metaImage = extractMetaImage(html);
  if (metaImage) return metaImage;

  const imgMatch = html.match(/<img[^>]+src="([^"]+)"/i);
  if (imgMatch?.[1]) return absoluteTiimUrl(imgMatch[1]);

  return null;
};

const extractExercises = async (): Promise<TiimExercise[]> => {
  const source = await fs.readFile(dataFilePath, 'utf8');
  const matches = [...source.matchAll(/"id":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"sourceUrl":\s*"([^"]+)"/g)];
  return matches.map((match) => ({
    id: match[1],
    name: match[2],
    sourceUrl: match[3],
  }));
};

const fileExtensionFromContentType = (contentType: string | null) => {
  if (!contentType) return '.jpg';
  if (contentType.includes('image/webp')) return '.webp';
  if (contentType.includes('image/png')) return '.png';
  if (contentType.includes('image/jpeg')) return '.jpg';
  return '.jpg';
};

const downloadIllustration = async (exercise: TiimExercise) => {
  if (!exercise.sourceUrl) return null;

  const pageResponse = await fetch(exercise.sourceUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; treninger-bot/1.0)',
    },
  });

  if (!pageResponse.ok) {
    throw new Error(`Kunne ikke hente side (${pageResponse.status})`);
  }

  const html = await pageResponse.text();
  const imageSrc = extractImageSrc(html);
  if (!imageSrc) return null;

  const absoluteImageUrl = absoluteTiimUrl(imageSrc);
  if (!absoluteImageUrl) return null;
  const imageResponse = await fetch(absoluteImageUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; treninger-bot/1.0)',
      referer: exercise.sourceUrl,
    },
  });

  if (!imageResponse.ok) {
    throw new Error(`Kunne ikke hente bilde (${imageResponse.status})`);
  }

  const extension = fileExtensionFromContentType(imageResponse.headers.get('content-type'));
  const fileName = `${exercise.id}-${toSlug(exercise.name)}${extension}`;
  const filePath = path.join(outputDir, fileName);
  const bytes = Buffer.from(await imageResponse.arrayBuffer());
  await fs.writeFile(filePath, bytes);

  return {
    fileName,
    publicPath: `/book-illustrations/tiim/${fileName}`,
  };
};

const writeImageMap = async (entries: Array<[string, string]>) => {
  const sorted = entries.sort((a, b) => a[0].localeCompare(b[0], 'nb'));
  const content = `export const tiimImageById: Record<string, string> = {\n${sorted
    .map(([id, publicPath]) => `  "${id}": "${publicPath}",`)
    .join('\n')}\n};\n`;
  await fs.writeFile(imageMapPath, content, 'utf8');
};

const main = async () => {
  await fs.mkdir(outputDir, { recursive: true });

  const exercises = await extractExercises();
  const imageEntries: Array<[string, string]> = [];

  for (const [index, exercise] of exercises.entries()) {
    try {
      const result = await downloadIllustration(exercise);
      if (result) {
        imageEntries.push([exercise.id, result.publicPath]);
        console.log(`[${index + 1}/${exercises.length}] ✓ ${exercise.id}`);
      } else {
        console.log(`[${index + 1}/${exercises.length}] - ${exercise.id} (ingen illustrasjon funnet)`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`[${index + 1}/${exercises.length}] ✗ ${exercise.id} (${message})`);
    }
  }

  await writeImageMap(imageEntries);
  console.log(`Lagret ${imageEntries.length} TIIM-illustrasjoner.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});