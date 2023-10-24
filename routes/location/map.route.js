const router = require("express").Router();
const MapsController = require("../../controllers/maps.controller");

router
  .get("/", (req, res) => {})
  .get("/zones", async (req, res) => {
    const { resp, status } = await MapsController.getStateZones(req, res);

    return res.status(status).json(resp);
  }).get("/zones/:zone/counties", async(req, res) => {
    const { resp, status } = await MapsController.getZoneCounties(req, res);

    return res.status(status).json(resp);
  })
  .get("/zones/:zone/counties/:county/sections", async (req, res) => {
    const { resp, status } = await MapsController.getCountySections(req, res);

    return res.status(status).json(resp);
  });

module.exports = router;
