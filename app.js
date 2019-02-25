const express = require("express");
const EventEmitter = require("events");
const bodyParser = require("body-parser");
const path = require("path");

const config = require("./config");

const app = express();
const Stream = new EventEmitter();

app.use(bodyParser.json());

let tickets = [
  { stilid: "abc1", name: "klas", count: 3 },
  { stilid: "abc2", name: "klas", count: 3 },
  { stilid: "abc3", name: "klas", count: 3 },
  { stilid: "abc4", name: "klas", count: 3 },
  { stilid: "abc5", name: "klas", count: 3 }
];

app.get("/list", (req, res) => res.json(tickets));

app.post("/eat", (req, res) => {
  const stilid = req.body.stilid;
  const ticket = tickets.find(item => item.stilid === stilid);
  if (!ticket) {
    return res.status(400).json({ message: "could not find ticket" });
  }

  if (ticket.mackor < 1) {
    return res.status(400).json({ message: "out of mackor" });
  }

  tickets = tickets.map(it =>
    it.stilid === stilid ? { ...it, count: it.count - 1 } : it
  );

  return res.json({
    message: `${ticket.name}s ticket count was reduced`,
    tickets
  });
});

app.use(express.static(path.join(__dirname, "front-end/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(`${__dirname}/front-end/build/index.html`))
);

app.listen(config.port, () =>
  console.log("\nApp started at http://localhost:" + config.port)
);
