const routes = require("express").Router();
const populationByAgeController = require("../../controllers/population-by-age.controller");

routes
  .get("/state", async (req, res) => {
    const resp = await populationByAgeController.getStatePopulationByAge(
      req,
      res
    );

    return res.status(200).json(resp);
  })
  .get("/state/zones/:zone", async (req, res) => {
    const { resp, status } = await populationByAgeController.getZonePopulationByAge(
      req,
      res
    );

    return res.status(status).json(resp);
  }).get("/state/zones/:zone/counties/:county/", async (req, res) => {
    const { resp, status } = await populationByAgeController.getCountyPopulation(
      req,
      res
    );

    return res.status(status).json(resp);
  });

module.exports = routes;
