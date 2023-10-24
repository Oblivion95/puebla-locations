const populationByAgeController = require('../services/population-by-age.service');

const getStatePopulationByAge = async (req, res) => {
  const result = populationByAgeController.getStatePopulationByAge(req, res);

  return result;
};

module.exports = { getStatePopulationByAge };
