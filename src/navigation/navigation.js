import process from 'process';
import path from 'path';
import fs from 'node:fs/promises';

export const navigation = {
  up() {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);

  if (parentDir === currentDir) {
    console.log('❌ You are already at the root directory');
    return;
  }

  process.chdir(parentDir);
  },

  cd(dir) {
    if(!dir) {
      throw new Error('No directory specified');
    }

    try {
      process.chdir(path.resolve(process.cwd(), dir));
    } catch {
      console.log('no such directory');
    }
  },

  async ls() {
    const currentDir = process.cwd();

  try {
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    const folders = [];
    const files = [];

    for (const item of items) {
      if (item.isDirectory()) {
        folders.push({ name: item.name, type: 'directory' });
      } else if (item.isFile()) {
        files.push({ name: item.name, type: 'file' });
      }
    }

    folders.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    const sorted = [...folders, ...files];

    console.log('\n📂 Contents of', currentDir, '\n');
    console.table(sorted, ['name', 'type']);
    } catch (error) {
      console.log('❌ Error reading directory:', error.message);
    }
  }
}