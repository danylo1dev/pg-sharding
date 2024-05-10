const crypto = require("crypto");
const { hr, clients } = require("../database.config");
exports.create = async (url) => {
  const hash = crypto.createHash("sha256").update(url).digest("base64");

  const urlId = hash.substring(0, 5);
  const server = hr.get(urlId);

  await clients[server].query(
    "INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1, $2)",
    [url, urlId]
  );
  return {
    url,
    urlId,
    server,
  };
};
exports.getById = async (urlId) => {
  const server = hr.get(urlId);
  const result = await clients[server].query(
    "SELECT * FROM URL_TABLE WHERE URL_ID = $1",
    [urlId]
  );
  if (result.rowCount < 0) {
    res.sendStatus(404);
  }
  return {
    url: result.rows[0],
    urlId,
    server,
  };
};
