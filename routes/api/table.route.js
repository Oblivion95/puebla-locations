const express = require("express");
const routes = express.Router();
const TableController = require("../../controllers/zones.controller");

routes
  .get("/zones", (req, res) => {
    const resp = TableController.getZones(req, res);

    return res.status(resp.status).json(resp);
  })
  .get("/zones/:zone/counties", (req, res) => {
    try {
      const result = TableController.getZoneCounties(req, res);

      return res.status(result.status).json(result);

    } catch ({ status, message }) {
      console.error(message);

      return res.status(status).json({ message: message });
    }
  }).get("/zones/:zone/counties/:county/sections", async (req, res) => {
    try {
      const result = await TableController.getCountyZones(req, res);

      return res.status(result.status).json(result);

    } catch ({ status, message }) {
      console.error(message);

      return res.status(status).json({ message: message });
    }
  })


module.exports = routes;
