const { faker } = require("@faker-js/faker");

exports.municipalities = (() => {
  const zonesMap = require("../constants/puebla-counties-by-zone.json");
  const { zones: zonesDB } = require("../constants/zones.json");
  const { MAX_PROMOTIONS } = require("../constants/stats.json");

  const counties = {};

  const municipalitiesDB = zonesMap.reduce(
    (prev, { zone, geoJSON: { features } }) => {
      const { goal } = zonesDB.find(({ name }) => name === zone);
      const { length: totalCounties } = features;
      const countyGoal = (goal / totalCounties) | 0;


      const zoneCounties = features.map(
        ({ properties: { nomgeo: name } }) => {
          const countyPromoted = faker.number.int({
            min: 10,
            max: (countyGoal * 0.8) | 0,
          });
          const countyProgress = +((countyPromoted / countyGoal) * 100).toFixed(5);
          const contributionToGlobal = +(
            (countyPromoted / MAX_PROMOTIONS) *
            100
          ).toFixed(5);

          return {
            name,
            zone,
            goal: countyGoal,
            promoted: countyPromoted,
            progress: countyProgress,
            contributionToGlobal,
          };
        }
      );

      return {...prev, [zone]: zoneCounties};
    },
    counties
  );

  return municipalitiesDB;
})();
