const getZipCodes = require("../utils/get-zc-by-county");
const counties = require("../constants/counties-by-zone.json");
const { MAX_PROMOTIONS } = require("../constants/stats.json");
const { faker } = require("@faker-js/faker");
const incomesByZone = require("../constants/incomes-by-zone.json");

const getZonesIncomes = (req, res) => {
  return { status: 200, data: incomesByZone.db, message: "Success" };
};

const getZoneCounties = (req, res) => {
  const { zone } = req.params;

  if (!zone) {
    throw { message: "Missing zone", status: 400 };
  }

  const zoneCounties = { counties: counties[zone] };

  return zoneCounties;
};

const getCountyZones = async (req, res) => {
  let { zone, county } = req.params;

  if (!zone) {
    throw { message: "Missing zone", status: 400 };
  }

  if (!county) {
    throw { message: "Missing county", status: 400 };
  }

  county = county.replace(/%20|\+/g, " ");

  const [countyStats] = counties[zone].db.filter((c) => c.name === county);
  const zipCodes = await getZipCodes(county);

  const sections = {};

  sections.sections = {};

  sections.sections.db = Array.from({ length: zipCodes.length }, (_, index) => {
    const promoted = faker.number.int({
      min: 10,
      max: (countyStats.goal * 0.4) | 0,
    });

    return {
      name: `sección ${index + 1}`,
      promoted,
      progress: +((promoted / countyStats.goal) * 100).toFixed(5),
      contributionToGlobal: +((promoted / MAX_PROMOTIONS) * 100).toFixed(5),
    };
  });

  sections.sections.meta = {
    totalPromoted: sections.sections.db.reduce(
      (acc, curr) => acc + curr.promoted,
      0
    ),
    totalContributionToGlobal: sections.sections.db.reduce(
      (acc, curr) => acc + curr.contributionToGlobal,
      0
    ),
  };

  return sections;
};

module.exports = {
  getZoneCounties,
  getCountyZones,
  getZonesIncomes,
};
