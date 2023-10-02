const router = require("express").Router();
const MapsController = require("../../controllers/maps.controller");

router
  .get("/zones", (req, res) => {
    const { resp, status } = MapsController.getStateZones(req, res);

    return res.status(status).json(resp);
  }).get("/zones/:zone/counties", (req, res) => {
    const { resp, status } = MapsController.getStateZones(req, res);

    return res.status(status).json(resp);
  })
  // .get("/zones/:zone/counties/:county", (req, res) => {
  //   const { resp, status } = MapsController.getZoneCounties(req, res);

  //   return res.status(status).json(resp);
  // })
  .get("/zones/:zone/counties/:county/sections", async (req, res) => {
    const { resp, status } = await MapsController.getCountyZones(req, res);

    return res.status(status).json(resp);
  });

module.exports = router;
