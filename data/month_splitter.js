const data = require("./db.json");
const fs = require("fs");

const file = "month_arr.json";

var stream = fs.createWriteStream(file, { flags: "a" });
const len = data.events.length;

data.events.map((eventObj, i) => {
  const [year, month, day] = eventObj.date.split("/");
  const data = [year, month, day];
  if (i === 0) {
    stream.write(`[${JSON.stringify(data)},`);
  }
  stream.write(`${JSON.stringify(data)},`);
});

stream.end();
