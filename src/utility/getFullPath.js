import path from 'node:path';
import process from 'node:process';

export function getFullPath(filePath) {
  return path.resolve(process.cwd(), filePath);
}