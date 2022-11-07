const fs = require("fs");
const path = require("path");
const secretFolder = path.join(__dirname, "secret-folder");
const showFilesStat = (err, files) => {
  if (err) process.stderr.write(err);
  for (let file of files) {
    if (file.isFile()) {
      fs.stat(`${secretFolder}/${file.name}`, (err, stats) =>
        filePath(err, stats, file.name)
      );
    }
  }
};
fs.readdir(secretFolder, { withFileTypes: true }, showFilesStat);
const filePath = (err, stats, fileName) => {
  if (err) process.stderr.write(err);
  const secretFolderFile = fileName.split(".");
  const size = stats.size;
  process.stdout.write(
    `${secretFolderFile[0]} - ${secretFolderFile[1]} - ${size}kb\n`
  );
};
