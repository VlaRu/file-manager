import process from 'node:process';

export function getUser() {
  const args = process.argv.slice(2);

  const usernameArg = args.find((arg) =>
    arg.startsWith(`--username=`)
  );
  if (!usernameArg) {
    return 'Anonymous';
  }
  return usernameArg? usernameArg.split('=')[1] : 'Anonymous';
}