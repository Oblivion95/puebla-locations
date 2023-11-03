const counties = require("../constants/counties-by-zone.json");
const incomeSources = require("../constants/income-sources.json");
const { faker } = require("@faker-js/faker");

module.exports.generateIncomesByZone = () => {
  const countiesArray = Object.entries(counties);

  const result = countiesArray.reduce((acc, [county, { db: data, meta }]) => {
    const result = data.map((county) => {
      const total = county.promoted;
      const { length } = incomeSources;

      const incomeTable = incomeSources.reduce((acc, curr) => {
        const incomeSourceTotal = faker.number.int({
          min: 10,
          max: total / length,
        });

        return {
          ...acc,
          [curr]: {
            total: incomeSourceTotal,
            percentage: +((incomeSourceTotal / total) * 100).toFixed(2),
            source: curr
          },
        };
      }, {});

      return {
        ...county,
        incomeTable,
      };
    });

    return {
      ...acc,
      [county]: {
        data: result,
        meta,
      },
    };
  }, {});

  return { data: result };
};
