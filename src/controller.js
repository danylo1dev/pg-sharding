const service = require("./service");

exports.getById = async (req, res, next) => {
  const urlId = req.params.urlId;
  try {
    res.send(await service.getById(urlId));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = statusCode.internallError;
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
      err.statusCode = statusCode.internallError;
    }
    next(err);
  }
};
