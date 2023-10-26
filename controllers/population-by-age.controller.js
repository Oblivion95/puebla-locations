const populationByAgeController = require('../services/population-by-age.service');

const getStatePopulationByAge = async (req, res) => {
  const result = await populationByAgeController.getStatePopulationByAge(req, res);

  return result;
};

module.exports = { getStatePopulationByAge };
