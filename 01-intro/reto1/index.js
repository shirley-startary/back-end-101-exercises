const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questionPromise = message =>
  new Promise((resolve, reject) => {
    rl.question(message, answer => {
      resolve(answer);
    });
  });

const readFilePromise = (file, options) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, options, (error, data) => {
      if (error) {
        reject(`Ocurrió un error: ${error.message}`);
        return;
      }
      resolve(data);
    });
  });

const exists = (answer, dataFile) =>
  new Promise((resolve, reject) => {
    if (dataFile.indexOf(answer) !== -1) {
      resolve(true);
      return;
    }
    resolve(false);
    return;
  });

const init = async (message, file, options) => {
  const answer = await questionPromise(message);
  console.log(answer);
  rl.close();
  const dataFile = await readFilePromise(file, options);
  console.log(dataFile);
  const result = await exists(answer, data);
  console.log(result);
};

init("Escribe algo que quieras buscar: ", "texto.txt", { encoding: "utf8" });
