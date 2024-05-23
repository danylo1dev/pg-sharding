const app = require("express")();
const database = require("./database.config");
const router = require("./src/router");
const errorHandler = require("./src/middlewares/error.middleware");
app.use(router);

database.connect();
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log("server started on post " + process.env.PORT);
});
