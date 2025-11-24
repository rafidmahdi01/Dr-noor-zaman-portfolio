import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const booksDir = join(__dirname, '../src/assets/image/books');
const targetSize = 50 * 1024; // 50KB

async function optimizeImage(filePath, filename) {
  try {
    const stats = await stat(filePath);
    
    // Skip if already under 50KB
    if (stats.size <= targetSize) {
      console.log(`✓ ${filename} - Already optimized (${(stats.size / 1024).toFixed(2)}KB)`);
      return;
    }

    const ext = filename.toLowerCase();
    
    // Process based on file type
    if (ext.endsWith('.png')) {
      await sharp(filePath)
        .webp({ quality: 75, effort: 6 })
        .toFile(filePath.replace('.png', '.webp'));
      console.log(`✓ ${filename} → ${filename.replace('.png', '.webp')} (Converted to WebP)`);
    } else if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) {
      // Optimize JPEG with progressive loading
      await sharp(filePath)
        .jpeg({ quality: 75, progressive: true, mozjpeg: true })
        .toFile(filePath.replace(/\.(jpg|jpeg)$/, '-optimized.jpg'));
      console.log(`✓ ${filename} - Optimized (${(stats.size / 1024).toFixed(2)}KB → checking...)`);
      
      // Check if optimized version is smaller
      const optimizedStats = await stat(filePath.replace(/\.(jpg|jpeg)$/, '-optimized.jpg'));
      if (optimizedStats.size < stats.size) {
        console.log(`  → Reduced to ${(optimizedStats.size / 1024).toFixed(2)}KB`);
      }
    } else if (ext.endsWith('.webp')) {
      // Re-optimize WebP
      await sharp(filePath)
        .webp({ quality: 70, effort: 6 })
        .toFile(filePath.replace('.webp', '-optimized.webp'));
      console.log(`✓ ${filename} - Re-optimized WebP`);
    }
  } catch (error) {
    console.error(`✗ ${filename} - Error: ${error.message}`);
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting image optimization...\n');
  
  const files = await readdir(booksDir);
  const imageFiles = files.filter(f => 
    /\.(jpg|jpeg|png|webp)$/i.test(f) && !f.includes('-optimized')
  );

  console.log(`Found ${imageFiles.length} images to process\n`);

  for (const file of imageFiles) {
    await optimizeImage(join(booksDir, file), file);
  }

  console.log('\n✅ Image optimization complete!');
}

optimizeAllImages().catch(console.error);
