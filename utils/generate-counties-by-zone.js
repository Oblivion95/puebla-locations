const { faker } = require("@faker-js/faker");

exports.municipalities = (() => {
  const zonesMap = require("../constants/puebla-counties-by-zone.json");
  const { zones: zonesDB } = require("../constants/zones.json");
  const { MAX_PROMOTIONS } = require("../constants/stats.json");

  const counties = {};

  const municipalitiesDB = zonesMap.reduce(
    (prev, { zone, geoJSON: { features } }) => {
      const { goal } = zonesDB.db.find(({ name }) => name === zone);
      const { length: totalCounties } = features;
      const countyGoal = (goal / totalCounties) | 0;

      const zoneCounties = {};
      zoneCounties.db = features.map(({ properties: { nomgeo: name } }) => {
        const countyPromoted = faker.number.int({
          min: 10,
          max: (countyGoal * 0.8) | 0,
        });
        const countyProgress = +((countyPromoted / countyGoal) * 100).toFixed(
          5
        );
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
      });

      zoneCounties.meta = {
        totalPromoted: zoneCounties.db.reduce(
          (prev, { promoted }) => prev + promoted,
          0
        ),
        totalContributionToGlobal: zoneCounties.db.reduce(
          (prev, { contributionToGlobal }) => prev + contributionToGlobal,
          0
        ),
      };

      return { ...prev, [zone]: zoneCounties };
    },
    counties
  );

  return municipalitiesDB;
})();
