const app = require("express")();
const crypto = require("crypto");
const { Client } = require("pg");
const HashRing = require("hashring");

const hr = new HashRing();
hr.add("5432");
hr.add("5433");
hr.add("5434");
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

app.get("/:urlId", async (req, res) => {
  const { urlId } = req.params;
  const server = hr.get(urlId);
  const result = await clients[server].query(
    "SELECT * FROM URL_TABLE WHERE URL_ID = $1",
    [urlId]
  );
  if (result.rowCount < 0) {
    res.sendStatus(404);
  }
  res.send({
    url: result.rows[0],
    urlId,
    server,
  });
});
app.post("/", async (req, res) => {
  const url = req.query.url;

  const hash = crypto.createHash("sha256").update(url).digest("base64");

  const urlId = hash.substring(0, 5);
  const server = hr.get(urlId);

  await clients[server].query(
    "INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1, $2)",
    [url, urlId]
  );
  res.send({
    url,
    urlId,
    server,
  });
});

connect();
async function connect() {
  try {
    await clients["5432"].connect();
    await clients["5433"].connect();
    await clients["5434"].connect();
  } catch {}
}

app.listen("3000");
