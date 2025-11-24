import { readdir, rename, unlink, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const booksDir = join(__dirname, '../src/assets/image/books');

async function replaceWithOptimized() {
  console.log('🔄 Replacing original images with optimized versions...\n');
  
  const files = await readdir(booksDir);
  let replaced = 0;
  let saved = 0;

  for (const file of files) {
    if (file.includes('-optimized')) {
      const original = file.replace('-optimized', '');
      const originalPath = join(booksDir, original);
      const optimizedPath = join(booksDir, file);

      try {
        // Get file sizes
        const originalStats = await stat(originalPath);
        const optimizedStats = await stat(optimizedPath);
        
        const savings = originalStats.size - optimizedStats.size;
        
        // Only replace if optimized is smaller
        if (optimizedStats.size < originalStats.size) {
          await unlink(originalPath);
          await rename(optimizedPath, originalPath);
          console.log(`✓ ${original}: ${(originalStats.size/1024).toFixed(2)}KB → ${(optimizedStats.size/1024).toFixed(2)}KB (saved ${(savings/1024).toFixed(2)}KB)`);
          replaced++;
          saved += savings;
        } else {
          // Keep original, delete optimized
          await unlink(optimizedPath);
          console.log(`✗ ${original}: Optimized version larger, keeping original`);
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
  }

  console.log(`\n✅ Replaced ${replaced} images`);
  console.log(`💾 Total space saved: ${(saved/1024/1024).toFixed(2)}MB`);
}

replaceWithOptimized().catch(console.error);
