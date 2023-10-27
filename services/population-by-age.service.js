const { faker } = require("@faker-js/faker");
const db = require("../model/puebla-population.json");
  const populationZonesDB = require("../model/zones-population.json");
  const { zones } = require('../constants/zones.json');

const getStatePopulationByAge = async (req, res) => {
  const result = db;

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

const getZonePopulationByAge = async (req, res) => {
  const { zone } = req.params;

  const result = populationZonesDB.population[zone];

  return result;
};

module.exports = { getStatePopulationByAge, getZonePopulationByAge };
