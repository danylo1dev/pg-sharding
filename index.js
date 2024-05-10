const app = require("express")();
const database = require("./database.config");
const router = require("./src/router");
app.use(router);

database.connect();

app.listen("3000", () => {
  console.log("server started on post 3000");
});
