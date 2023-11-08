const incomeSources = require("../constants/income-sources.json");
const { faker } = require("@faker-js/faker");

module.exports.getSources = () => {
  const sourcesArray = incomeSources.map(source => ({ source }));

  const incomes = sourcesArray.reduce((acc, curr, _, array) => {
    const max = 1692181 / array.length | 0;

    return {
      ...acc,
      [curr.source]: {
        source: curr.source,
        total: faker.number.int({ min: 1000, max  }),
        sources: array.reduce((acc, { source }) => {
          return {
            ...acc,
            [source]: faker.number.int({ min: 100, max: max / (array.length * 2) | 0  }),
          }
        }, {})
      }
    }
  }, {});

  const data = {
    incomeSources: sourcesArray,
    incomes
  };

  return data;
}
