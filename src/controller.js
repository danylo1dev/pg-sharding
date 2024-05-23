const service = require("./service");
const statusCode = require("http-status");
exports.getById = async (req, res, next) => {
  const urlId = req.params.urlId;
  try {
    res.send(await service.getById(urlId));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};
exports.create = async (req, res, next) => {
  const url = req.query.url;
  try {
    res.send(await service.create(url));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};
