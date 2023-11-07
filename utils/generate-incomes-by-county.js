const counties = require("../constants/counties-by-zone.json");
const incomeSources = require("../constants/income-sources.json");
const { faker } = require("@faker-js/faker");

module.exports.generateIncomesByZone = () => {
  const countiesArray = Object.entries(counties);

  const result = countiesArray.reduce((acc, [county, { db: data, meta }]) => {
    return {
      ...acc,
      [county]: incomeSources.reduce((acc, curr) => {
        const incomeSourceTotal = faker.number.int({
          min: 10,
          max: 200,
        });

        return {
          ...acc,
          [curr]: {
            total: incomeSourceTotal,
            percentage: +((incomeSourceTotal / meta.totalPromoted) * 100).toFixed(2),
            source: curr,
          },
        };
      }, {}),
    };
  }, {});

  return { data: result };
};
