const populationByAgeController = require("../services/population-by-age.service");

const getStatePopulationByAge = async (req, res) => {
  const result = await populationByAgeController.getStatePopulationByAge(
    req,
    res
  );

  return {
    data: result,
    status: 200,
    message: "Success",
  };
};

const getZonePopulationByAge = async (req, res) => {
  try {
    const result = await populationByAgeController.getZonePopulationByAge(
      req,
      res
    );

    console.table(result);

    if (!result) {
      throw result;
    }

    return {
      data: {
        data: result.population,
        meta: result.total,
      },
      status: 200,
      message: "Success"
    };
  } catch (error) {
    return {
      data: error,
      status: 500,
      message: "Internal Server Error"
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
