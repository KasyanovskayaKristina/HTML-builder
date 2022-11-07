const fs = require("fs");
let stream = new fs.ReadStream("text.txt", "utf8");
stream.on("readable", function () {
  let data = stream.read();
  if (data != null) console.log(data);
});
