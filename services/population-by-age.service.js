const getStatePopulationByAge = async (req, res) => {
  const result = require("../model/puebla-population.json");

  const last = result.population[result.population.length - 1];
  const rest = result.population.slice(0, -1);

  const total = Object.entries(last)
    .filter(([key]) => key !== "Grupo de edad")
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    population: rest,
    total,
  };
};

module.exports = { getStatePopulationByAge };
