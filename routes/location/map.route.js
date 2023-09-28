const router = require("express").Router();
const MapsController = require("../../controllers/maps.controller");

router
  .get("/zones/:zone?", (req, res) => {
    const { resp, status } = MapsController.getStateZones(req, res);

    return res.status(status).json(resp);
  })
  .get("/zones/:zone/counties/:county", (req, res) => {
    const { resp, status } = MapsController.getCountyMunicipalities(req, res);

    return res.status(status).json(resp);
  });

module.exports = router;
