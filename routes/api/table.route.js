const express = require("express");
const routes = express.Router();
const CountiesController = require("../../controllers/zones.controller");
const zones = require("../../constants/zones.json");

routes
  .get("/zones", (req, res) => {
    return res.status(200).json(zones);
  })
  .get("/zones/:zone/counties", (req, res) => {
    try {
      const result = CountiesController.getZoneCounties(req, res);

      return res.status(200).json(result);

    } catch ({ status, message }) {
      console.error(message);

      return res.status(status).json({ message: message });
    }
  }).get("/zones/:zone/counties/:county/sections", async (req, res) => {
    try {
      const result = await CountiesController.getCountyZones(req, res);

      return res.status(200).json(result);

    } catch ({ status, message }) {
      console.error(message);

      return res.status(status).json({ message: message });
    }
  })


module.exports = routes;
