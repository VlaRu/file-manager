import {navigation} from '../navigation/navigation.js';
import process from 'node:process';
import {messages} from '../utility/messages.js';
import { parseInput } from '../utility/parseInput.js';
import {fileOperations} from '../file-operations/operations.js';

function inputHandler() {
  process.stdin.setEncoding('utf-8');

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
        case 'rn':
          const [oldPath, newPath] = argument.split(' ');
          await fileOperations.rename(oldPath, newPath);
        break;
        case 'cp':
          const [srcFile, destDir] = argument.split(' ');
          await fileOperations.copyFile(srcFile, destDir);
        break;
        case '.exit':
          console.log(messages(getUser(), 'finishProgram'));
          process.exit(0);
      }
      console.log(messages(process.cwd(), 'startProgram'));
    }catch (error) {
        console.log('Error:', error.message);
      }
  })
}

function getUser() {
  const args = process.argv.slice(2);
  console.log(process.argv);

  const usernameArg = args.find((arg) =>
    arg.startsWith(`--username=`)
  );
  if (!usernameArg) {
    return 'Anonymous';
  }
  return usernameArg? usernameArg.split('=')[1] : 'Anonymous';
}

function exitHandler() {
  process.on('SIGINT', () => {
  console.log(messages(getUser(), 'finishProgram'));
  process.exit(0);
 });
}

export {inputHandler, getUser, exitHandler};