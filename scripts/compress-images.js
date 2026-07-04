import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'fs';
import { join } from 'path';

const inputDir = './public/artwork';
const outputDir = './public/artwork/compressed';
mkdirSync(outputDir, { recursive: true });

readdirSync(inputDir).forEach(file => {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) return;
    sharp(join(inputDir, file))
        .resize(1400)
        .webp({ quality: 82 })
        .toFile(join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp')));
});