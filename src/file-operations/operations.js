import fs from 'node:fs/promises';
import fss from 'node:fs';
import path from 'node:path';
import { getFullPath } from '../utility/getFullPath.js';

export const fileOperations = {
  read(filePath) {
    if (!filePath) {
      console.log('❌ Please specify a file name');
      return;
    }
    const fullPath = getFullPath(filePath);
    const stream = fss.createReadStream(fullPath, { encoding: 'utf8' });

    stream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    stream.on('end', () => {
      process.stdout.write('\n');
    });
    stream.on('error', (error) => {
      console.log('❌ Error reading file:', error.message);
    });
  },
  async create(filePath, content = '') {
    if (!filePath) {
      console.log('❌ Please specify a file name');
      return;
    }
    const fullPath = getFullPath(filePath);
    await fs.writeFile(fullPath, '', { flag: 'wx' });
    console.log(`✅ File created: ${fullPath}`);

  },
  async rename(filePath, newFilePath) {
    try {
      await fs.rename(filePath, newFilePath);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async copyFile(srcFile, destDir) {
    if (!srcFile || !destDir) {
      console.log('❌ Please specify source file and destination directory');
      return;
    }

    const srcPath = getFullPath(srcFile);
    const destPath = path.join(getFullPath(destDir), path.basename(srcFile));

    try {
      await fs.access(srcPath);

      try {
        await fs.access(destPath);
        console.log('❌ Destination file already exists');
        return;
      } catch (err) {
        if (err.code !== 'ENOENT') throw err;
      }

      const readStream = fss.createReadStream(srcPath);
      const writeStream = fss.createWriteStream(destPath);

      readStream.pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
          console.log(`✅ File copied: ${destPath}`);
          resolve();
        });
        writeStream.on('error', reject);
        readStream.on('error', reject);
      });

    } catch (error) {
      console.log('❌ Error copying file:', error.message);
    }
  },
  async move(srcFile, destDir){
    const destPath = await this.copyFile(srcFile, destDir);
    if (!destPath) return;

    try {
      const srcPath = getFullPath(srcFile);
      await fs.unlink(srcPath);
      console.log(`✅ File moved: ${destPath}`);
    } catch (error) {
      console.log('❌ Error deleting original file:', error.message);
    }
  },
  async delete(srcFile){
    const filePath = getFullPath(srcFile);
    await fs.access(filePath);
    await fs.unlink(filePath);
  },
  /* ,
  compress(){},
  decompress(){} */
}