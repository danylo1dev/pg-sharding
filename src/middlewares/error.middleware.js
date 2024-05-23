const statusCode = require("http-status");
module.exports = (error, req, res, next) => {
  const status = error.statusCode || statusCode.INTERNAL_SERVER_ERROR;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
};
