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

  }
}