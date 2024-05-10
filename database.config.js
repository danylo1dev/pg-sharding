const { Client } = require("pg");
const HashRing = require("hashring");

const hr = new HashRing();
hr.add("5432");
hr.add("5433");
hr.add("5434");
exports.hr;

const clients = {
  5432: new Client({
    host: "localhost",
    post: "5432",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),
  5433: new Client({
    host: "localhost",
    post: "5433",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),
  5434: new Client({
    host: "localhost",
    post: "5434",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),
};
exports.clients;

exports.connect = async () => {
  try {
    await clients["5432"].connect();
    await clients["5433"].connect();
    await clients["5434"].connect();
  } catch {}
};
