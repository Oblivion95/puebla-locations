const populationByAgeController = require("../services/population-by-age.service");

const getStatePopulationByAge = async (req, res) => {
  const result = await populationByAgeController.getStatePopulationByAge(
    req,
    res
  );

  return result;
};

const getZonePopulationByAge = async (req, res) => {
  try {
    const result = await populationByAgeController.getZonePopulationByAge(
      req,
      res
    );

    if (!result) {
      throw result;
    }

    return {
      resp: {
        population: result.population,
        total: result.total,
      },
      status: 200,
    };
  } catch (error) {
    return {
      error: error,
      status: 500,
    };
  }
};

const getCountyPopulation = async (req, res) => {
  const { county } = req.params;


};

module.exports = {
  getStatePopulationByAge,
  getZonePopulationByAge,
  getCountyPopulation,
};
