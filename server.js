var path = require("path");
var express = require("express");
var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/static/index.html");
});
// app.use(function (_, response) {
//   response.sendFile(__dirname + "/public/static/index.html");
// });
app.listen(3000, () => console.log("server starting on 3000 PORT"));
