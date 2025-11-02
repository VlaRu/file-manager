import os from 'node:os';

export const operationSystem = (argument) => {
  switch (argument) {
    case '--cpus':
      cpus();
      break;
    case '--EOL':
      eol();
      break;
    case '--homedir':
      homedir();
      break;
    case '--username':
      username();
      break;
    case '--architecture':
      architecture();
      break;
    default:
      console.log('❌ Unknown OS argument. Available options: --cpus, --EOL, --homedir, --username, --architecture');
  }
};

function cpus() {
    const cpus = os.cpus();
    console.log('Number of CPU cores:', cpus.length);

    cpus.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log(`  Model: ${cpu.model}`);
      console.log(`  Speed: ${cpu.speed} MHz`);
    });
}

function eol() {
  console.log('End-of-Line marker:', JSON.stringify(os.EOL));
}
function homedir() {
  console.log('Home Directory:', os.homedir());
}
function username() {
  const userInfo = os.userInfo();
  console.log('Username:', userInfo.username);
}
function architecture() {
  console.log('System Architecture:', os.arch());
}