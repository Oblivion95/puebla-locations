const zones = require("../constants/zones.json");
const incomeSources = require("../constants/income-sources.json");
const { faker } = require("@faker-js/faker");

module.exports.generateIncomesByZone = () => {
  const {
    zones: { db: dbZones },
  } = zones;

  const result = dbZones.map((zone) => {
    const total = zone.promoted;
    const { length } = incomeSources;

    const incomeTable = incomeSources.reduce((acc, curr) => {
      const incomeSourceTotal = faker.number.int({
        min: 100,
        max: total / length,
      });

      return {
        ...acc,
        [curr]: {
          total: incomeSourceTotal,
          percentage: +((incomeSourceTotal / total) * 100).toFixed(2),
        },
      };
    }, {});

    return {
      ...zone,
      incomeTable,
    };
  });

  return { db: result };
};
