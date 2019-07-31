"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

function Location(city, geoData) {
  this.search_query = city;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

// app.use(express.static("./public"));

app.get("/location", (request, response) => {
  const geo = require("./data/geo.json");
  console.log(request.query.data);
  const blob = new Location(request.query.data, geo);
  console.log(blob);
  response.send(blob);
});

app.get("/data", (request, response) => {
  let airplanes = {
    departure: Date.now(),
    canFly: true,
    pilot: "Well Trained"
  };
  response.status(200).json(airplanes);
});

app.use("*", (request, response) =>
  response.send("Sorry, that route does not exist.")
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
