import fs from 'node:fs';
import path from 'node:path';

export const fileOperations = {
  async read(filePath) {
    const fullPath = path.resolve(process.cwd(), filePath);
    try {
      const file = await fs.createReadStream(fullPath, { encoding: 'utf8' });
      file.on('data', (chunk) => {
        process.stdout.write(chunk);
      });
      file.on('end', () => {
        process.stdout.write('\n');
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }/* ,
  create(){

  },
  rename(){},
  copy(){},
  move(){},
  delete(){},
  compress(){},
  decompress(){} */
}