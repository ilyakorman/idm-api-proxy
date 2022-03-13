// init project
var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");

axios.defaults.headers.common["Authorization"] =
  "Basic MzU1MDpQaUtRMXhmdUtDMjJjMWM1YzAwNjFhZjEyYTI0MGUwOTJkOTNlYzZhNDdnbWNrd1FHaHA2";
axios.defaults.headers.common["x-idomoo-api-mode"] = "developer";

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, authorization, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// A route for POST requests sent to `/storyboard`
app.post("/storyboards/generate", function (req, res) {
  console.log("Received POST: " + JSON.stringify(req.body));
  return axios
    .post("https://usa-api.idomoo.com/api/v2/storyboards/generate", req.body)
    .then((response) => {
      console.log(response.data);
      return res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// A GET request handler for `/storyboard`
app.get("/storyboard/:sbid", function (req, res) {
  console.log("Received GET: " + JSON.stringify(req.params.sbid));

  return axios
    .get(`https://usa-api.idomoo.com/api/v2/storyboards/${req.params.sbid}`)
    .then((response) => {
      console.log(response.data);
      return res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/forbidden", function (reg, res) {
  setTimeout(function () {
    return res.sendStatus(403);
  }, 5000);
});
app.head("/forbidden", function (reg, res) {
  setTimeout(function () {
    return res.sendStatus(403);
  }, 7000);
});
const PORT = process.env.PORT || 8080;
var listener = app.listen(PORT, function () {
  console.log("Listening on port " + listener.address().port);
});
