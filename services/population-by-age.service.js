const getStatePopulationByAge = async (req, res) => {
  const result = require("../model/puebla-population.json");

  return result;
};

module.exports = { getStatePopulationByAge };
