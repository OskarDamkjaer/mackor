const express = require("express");
const EventEmitter = require("events");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config");
const fs = require("fs");
const promisify = require("util").promisify;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./mackor/mackor.db", err => {
  if (err) {
    console.error(err.message);
  }
});
db.all = promisify(db.all);
db.run = promisify(db.run);

const app = express();
const Stream = new EventEmitter();
const getTickets = () => db.all("SELECT * FROM mackor;", []);

const reduceTickets = stil =>
  db.run(`update mackor set count=count-1 where stilid="${stil}"`);

app.use(bodyParser.json());

app.get("/list", async (req, res) => getTickets().then(rows => res.json(rows)));

app.post("/eat", async (req, res) => {
  const stilid = req.body.stilid;
  const tickets = await getTickets();
  const ticket = tickets.find(item => item.stilid === stilid);
  if (!ticket) {
    return res.status(400).json({ message: "could not find ticket" });
  }

  if (ticket.count < 1) {
    return res.status(400).json({ message: "out of mackor" });
  }

  await reduceTickets(stilid);

  fs.appendFile(
    "logs.txt",
    `${stilid};${new Date().toString()};en macka togs bort\n`,
    err => err && console.log(err)
  ); // Async but we don't care

  return getTickets().then(tickets =>
    res.json({
      message: `${ticket.name}s ticket count was reduced`,
      tickets
    })
  );
});

app.use(express.static(path.join(__dirname, "front-end/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(`${__dirname}/front-end/build/index.html`))
);

app.listen(config.port, () =>
  console.log("\nApp started at http://localhost:" + config.port)
);
