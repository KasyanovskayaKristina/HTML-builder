const fs = require("fs/promises");
const path = require("path");
const pathorigin = path.join(__dirname, "files");
const pathcopy = path.join(__dirname, "files-copy");

const copyfile = async (src, dest) => {
  await fs.rm(dest, { recursive: true, force: true });
  await fs.mkdir(dest, { recursive: true });
  const elements = await fs.readdir(src, { withFileTypes: true });
  elements.forEach(async (file) => {
    const files = path.join(src, file.name);
    const filescopy = path.join(dest, file.name);

    if (file.isDirectory()) {
      await copyfile(files, filescopy);
    } else {
      await fs.copyFile(files, filescopy);
    }
    console.log(elements);
  });
};

copyfile(pathorigin, pathcopy);
