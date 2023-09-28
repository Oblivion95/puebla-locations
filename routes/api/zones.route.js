const express = require("express");
const routes = express.Router();
const counties = require("../../controllers/zones.controller");

routes
  .get("/zones", (req, res) => {
    const zones = require("../../constants/zones.json");

    return res.status(200).json(zones);
  })
  .get("/zones/:zone/counties", (req, res) => {
    try {
      const result = counties.getCountiesZone(req, res);

      return res.status(200).json(result);

    } catch ({ status, message }) {
      console.error(message);

      return res.status(status).json({ message: message });
    }

  }).get("/zones/:zone/counties/:county", (req, res) => {
    try {
      const result = counties.getCountiesZone(req, res);

      return res.status(200).json(result);

    } catch ({ status, message }) {
      console.error(message);

      return res.status(status).json({ message: message });
    }
  })


module.exports = routes;
