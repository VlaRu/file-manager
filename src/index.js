import os from 'node:os';
import {inputHandler} from './cli/index.js';
import {messages} from './utility/messages.js';
import process from 'node:process';
import {getUser} from './user/getUser.js';
import {exitHandler} from './utility/exitHandler.js';

const homeDir = os.homedir();
process.chdir(homeDir);

const user = getUser();
console.log(messages(user, 'hiUser'));
console.log(messages(process.cwd(), 'startProgram'));

inputHandler(user);
exitHandler();