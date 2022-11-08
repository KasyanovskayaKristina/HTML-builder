const path = require("path");
const fs = require("fs/promises");
const bundleElements = path.join(__dirname, "project-dist", "assets");
const stylesElement = path.join(__dirname, "styles");
const assetElements = path.join(__dirname, "assets");
const componentsElement = path.join(__dirname, "components");
const htmlElements = path.join(__dirname, "template.html");
const pathnewBundle = path.join(__dirname, "project-dist");

//создали файл **style.css**
const copyStyle = async () => {
  const styles = [];
  const files = await fs.readdir(stylesElement, { withFileTypes: true });
  let lines = "";

  for (let file of files) {
    const separation = file.name.split(".")[1];

    if (file.isFile() && separation === "css") {
      const pathStyle = path.join(stylesElement, file.name);
      const style = await fs.readFile(pathStyle);
      styles.push(style);
    }
  }

  styles.forEach(
    (style) => (lines = lines + style.toString().trim() + "\n" + "\n")
  );

  await fs.writeFile(`${pathnewBundle}/style.css`, lines);
};
//перенесли  папку **assets** в папку project-dist 
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
///// основная часть сборки 
const mainContent = async () => {
    await fs.rm(pathnewBundle, {recursive: true, force: true});
    await fs.mkdir(pathnewBundle); // асинхронный каталог 
    const htmlFile = await fs.readFile(htmlElements); // прочитали html файлы 
    const components = await fs.readdir(componentsElement, {withFileTypes: true}); // прочитали содержимого папки conponents
    let newFile = ""; 
    let tempHtml = htmlFile.toString().split('\n');// привели все елементы html к строке и сделали переносы
    for(file of components) {
        const name = file.name.split(".")[0]; //упорядочили
        const content = await fs.readFile(`${componentsElement}/${file.name}`); // await для очереди выполнения = 

        for (let i = 0; i < tempHtml.length; i++) {
          if (tempHtml[i].trim() == `{{${name}}}`) {
              let blank = "";
              tempHtml[i]
               .split("")
               .map((a) => (a === " " ? (blank += a) : ""))
               .join("");
              const install = content
                .toString()
                 .split("\n")
                  .map((a) => (a = blank + a))
                 .join("\n");
               tempHtml.splice(i, 1, `${install}\n`);
                 }
             }
         }


  tempHtml.forEach((line) => (newFile += line));
  await fs.writeFile(`${pathnewBundle}/index.html`, newFile);

  await copyStyle();
  await copyfile(assetElements, bundleElements);


}
mainContent()
