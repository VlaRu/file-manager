export const messages = (data, key) => {
  const allMessages = {
    startProgram: `You are currently in ${data}`,
    hiUser: `Welcome to the File Manager, ${data}!`,
    finishProgram: `Thank you for using File Manager, ${data}, goodbye!`
  };

  return allMessages[key];
}