import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'fs';
import { join } from 'path';

// --- Artwork (already done, keep for reference) ---
// const artInput = './public/artwork/originals';
// const artOutput = './public/artwork/compressed';

// --- Certificates ---
const certInput = './public/certificates/originals';
const certOutput = './public/certificates/images';
mkdirSync(certOutput, { recursive: true });

readdirSync(certInput).forEach(file => {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) return;
    sharp(join(certInput, file))
        .resize(1200)
        .webp({ quality: 85 })
        .toFile(join(certOutput, file.replace(/\.(jpg|jpeg|png)$/i, '.webp')));
});