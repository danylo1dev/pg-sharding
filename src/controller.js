const service = require("./service");

exports.getById = async (req, res, next) => {
  const urlId = req.params.urlId;
  res.send(await service.getById(urlId));
};
exports.create = async (req, res, next) => {
  const url = req.query.url;
  res.send(await service.create(url));
};
