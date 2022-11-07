const fs = require("fs");
const path = require("path");
const text = path.join(__dirname, "text.txt");
const { stdin, stdout, exit } = require("process");
const message = fs.createWriteStream(text);

stdout.write("Whats your name?\n");
stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    GoodBye();
  }
  message.write(data);
});

function GoodBye() {
  stdout.write("\nGood bye");
  exit();
}
process.on("SIGINT", GoodBye);
