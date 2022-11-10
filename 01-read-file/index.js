const fs = require("fs");
let stream = new fs.ReadStream("01-read-file/text.txt", "utf8");
stream.on("readable", function () {
  let data = stream.read();
  if (data != null) console.log(data);
});
