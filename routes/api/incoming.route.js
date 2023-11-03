const express = require("express");
const routes = express.Router();
const IncomesController = require("../../controllers/income.controller");

routes
  .get("/zones", (req, res) => {
    const result = IncomesController.getZonesIncomes(req, res);

    return res.status(result.status).json(result);
  })
  .get("/zones/:zone/counties", (req, res) => {
    try {
      const result = IncomesController.getZoneCounties(req, res);

      return res.status(result.status).json(result);

    } catch ({ status, message }) {
      console.error(message);

      return res.status(status).json({ message: message, status, data: null });
    }
  }).get("/zones/:zone/counties/:county/sections", async (req, res) => {
    try {
      const result = await IncomesController.getCountyZones(req, res);

      return res.status(result.status).json(result);

    } catch ({ status, message }) {
      console.error(message);

      return res.status(status).json({ message: message, status, data: null });
    }
  })


module.exports = routes;
