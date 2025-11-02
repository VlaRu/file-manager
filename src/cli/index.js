import {navigation} from '../navigation/navigation.js';
import process from 'node:process';
import {messages} from '../utility/messages.js';
import { parseInput } from '../utility/parseInput.js';
import {fileOperations} from '../file-operations/operations.js';
import { calculateHash } from '../hash/getHash.js';
import {getUser} from '../user/getUser.js';

export function inputHandler() {
  process.stdin.setEncoding('utf-8');

  process.stdout.write('Enter command: ');

  process.stdin.on('data', async(data) => {
    const input = data.toString().trim();
    if (!input) return;
    const {command, argument} = parseInput(input);
    try{
      switch (command) {
        case 'up':
          navigation.up();
          break;
        case 'cd':
          navigation.cd();
          break;
        case 'ls':
          await navigation.ls();
          break;
        case 'cat':
          await fileOperations.read(argument);
          break;
        case 'add':
          await fileOperations.create(argument);
        break;
        case 'mkdir':
          await fileOperations.createDir(argument);
        break;
        case 'rn':
          const [oldPath, newPath] = argument.split(' ');
          await fileOperations.rename(oldPath, newPath);
        break;
        case 'cp':
          const [srcFile, destDir] = argument.split(' ');
          await fileOperations.copyFile(srcFile, destDir);
        break;
        case 'mv':
          const [srcFileMove, destDirMove] = argument.split(' ');
          await fileOperations.move(srcFileMove, destDirMove);
        break;
        case 'rm':
          await fileOperations.delete(argument);
        break;
        case 'compress':
          const [srcFileCompress, destFileCompress] = argument.split(' ');
          await fileOperations.compress(srcFileCompress, destFileCompress);
        break;
        case 'decompress':
          const [srcFileDecompress, destFileDecompress] = argument.split(' ');
          await fileOperations.decompress(srcFileDecompress, destFileDecompress);
        break;
        case 'hash':
          await calculateHash(argument);
        break;
        case '.exit':
          console.log(messages(getUser(), 'finishProgram'));
          process.exit(0);
        default:
          console.log(messages(null, 'invalidCommand'));
      }
      console.log(messages(process.cwd(), 'startProgram'));
    }catch (error) {
        console.log('Error:', error.message);
    }finally {
    process.stdout.write('Enter command: ');
 }
  })
};