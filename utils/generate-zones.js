const { faker } = require("@faker-js/faker");

exports.zones = (() => {
  const colors = require("../constants/colors.json");
  const { length: zonesLength } = colors;

  const MAX_PROMOTIONS = 1_000_000;

  const tuple = Array.from({ length: zonesLength }, (_, i) => i + 1).map(
    (row, index) => {
      const goal = (MAX_PROMOTIONS / zonesLength) | 0;
      const promoted = faker.number.int({ min: 1000, max: (goal * 0.8) | 0 });
      const progress = +((promoted / goal) * 100).toFixed(5);
      const contributionToGlobal = +((promoted / MAX_PROMOTIONS) * 100).toFixed(
        5
      );

      return {
        id: row,
        name: `zona-${row}`,
        goal,
        promoted,
        progress,
        contributionToGlobal,
        color: colors[index],
      };
    }
  );

  return {
    db: tuple,
    meta: {
      totalPromoted: tuple.reduce((acc, { promoted }) => acc + promoted, 0),
      totalContributionToGlobal: tuple.reduce(
        (acc, { contributionToGlobal }) => acc + contributionToGlobal,
        0
      ),
    },
  };
})();
