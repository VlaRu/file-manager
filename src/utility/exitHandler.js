import process from 'node:process';
import { messages } from '../utility/messages.js';
import { getUser } from '../user/getUser.js';

export function exitHandler() {
  process.on('SIGINT', () => {
  console.log(messages(getUser(), 'finishProgram'));
  process.exit(0);
 });
}