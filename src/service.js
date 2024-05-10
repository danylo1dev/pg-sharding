const crypto = require("crypto");
const { hr, clients } = require("../database.config");
const statusCode = require("./utils/statusCode");
exports.create = async (url) => {
  try {
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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = statusCode.internallError;
    }
    return err;
  }
};
exports.getById = async (urlId) => {
  try {
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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = statusCode.internallError;
    }
    return err;
  }
};
