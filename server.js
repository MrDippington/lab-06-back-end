"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_address = geoData.results[0].formatted_address;
  this.latitude = Number(geoData.results[0].geometry.location.lat);
  this.longitude = Number(geoData.results[0].geometry.location.lng);
}

app.use(express.static("./public"));
app.use(cors());

app.get("/location", (request, response) => {
  try {
    const geo = require("./data/geo.json");
    console.log(request.query.data);
    const blob = new Location(request.query.data, geo);
    console.log(blob);
    response.send(blob);
  } catch (error) {
    handleError(error);
  }
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

function handleError(err, response) {
  console.error(err);
  if (response) {
    response.status(500).send("Sorry, something went wrong here.");
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
