const incomeSources = require("../constants/income-sources.json");
const { faker } = require("@faker-js/faker");

const PUEBLA_POPULATION = 1692181;

module.exports.getSources = () => {
  const sourcesArray = incomeSources.map((source) => ({ source }));

  function getAllCombinations(elements) {
    let result = [];

    function combine(current, start) {
      for (let i = start; i < elements.length; i++) {
        let newCombination = current.concat(elements[i]);
        result.push(newCombination);
        combine(newCombination, i + 1);
      }
    }

    combine([], 0);
    return result;
  }

  const allCombinations = getAllCombinations(incomeSources);

  console.log(allCombinations)

  const incomes = allCombinations.map((combination, _, array) => {
    const max = (PUEBLA_POPULATION / array.length) | 0;
    const total = faker.number.int({ min: 1000, max });

    return {
      sets: combination,
      total,
    };
  });

  // const incomes = sourcesArray.reduce((acc, curr, _, array) => {
  //   const max = (PUEBLA_POPULATION / array.length) | 0;

  //   return {
  //     ...acc,
  //     [curr.source]: {
  //       source: curr.source,
  //       total: faker.number.int({ min: 1000, max }),
  //       sources: array
  //         .filter(({ source }) => source !== curr.source)
  //         .reduce((acc, { source }) => {
  //           return {
  //             ...acc,
  //             [source]: faker.number.int({
  //               min: 100,
  //               max: (max / (array.length * 2)) | 0,
  //             }),
  //           };
  //         }, {}),
  //     },
  //   };
  // }, {});

  const data = {
    incomeSources: sourcesArray,
    incomes,
  };

  return data;
};
