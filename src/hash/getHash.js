import { getFullPath } from '../utility/getFullPath.js';
import crypto from 'node:crypto';
import fs from 'node:fs';

export async function calculateHash(filePAth) {
  const fullPath = getFullPath(filePAth);
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(fullPath);

  stream.on('data', (chunk) => {
      hash.update(chunk);
  });

  stream.on('end', () => {
    console.log(hash.digest('hex'));
  });

  stream.on('error', () => {
    throw new Error(error.message);
  });
}