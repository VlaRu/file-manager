import { log } from 'console';
import {inputHandler, getUser, exitHandler} from './cli/index.js';
import {messages} from './utility/messages.js';
import os from 'os';
import process from 'node:process'

const user = getUser();
console.log(messages(user, 'hiUser'));
console.log(messages(process.cwd(), 'startProgram'));

inputHandler(user);
exitHandler();