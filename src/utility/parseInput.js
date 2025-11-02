export function parseInput(input) {
  const [command, ...args] = input.split(' ');
  return { command, argument: args.join(' ') };
}