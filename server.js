const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});
const port = process.env.PORT || 8085;
const server = app.listen(port, listening);

function listening() {
  console.log(`localhost:${port}`);
}
// get root
app.post("/get", (req, res) => {
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lng}&appid=${process.env.openweather_key}&units=imperial`;

  axios
    .get(openWeatherUrl)
    .then((response) => {
      res.json({
        summary: response.data.weather[0].main,
        humidity: response.data.main.humidity,
        temperature: response.data.main.temp,
        pressure: response.data.main.pressure,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
