const routes = require('express').Router();
const populationByAgeController = require('../../controllers/population-by-age.controller');

routes.get('/', async (req, res) => {
  const resp = await populationByAgeController.getStatePopulationByAge(req, res);

  return res.status(200).json(resp);
});

module.exports = routes;
