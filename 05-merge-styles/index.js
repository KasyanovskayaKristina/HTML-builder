const fs = require("fs/promises");
const path = require("path");
const { isArrayBuffer } = require("util/types");
const pathallStyles = path.join(__dirname, "styles");
const pathnewBundle = path.join(__dirname, "project-dist", "bundle.css");

const copyStyle = async () => {
  const styles = [];
  const files = await fs.readdir(pathallStyles, { withFileTypes: true });
  let lines = "";

  for (let file of files) {
    const separation = file.name.split(".")[1];

    if (file.isFile() && separation === "css") {
      const pathStyle = path.join(pathallStyles, file.name);
      const style = await fs.readFile(pathStyle);
      styles.push(style);
    }
  }

  await fs.rm(pathnewBundle, { recursive: true, force: true });

  styles.forEach((style) => (lines = lines + style.toString() + "\n"));

  await fs.writeFile(pathnewBundle, lines);
};

copyStyle();
