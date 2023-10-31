const getZipCodes = require("../utils/get-zc-by-county");
const counties = require("../constants/counties-by-zone.json");
const { MAX_PROMOTIONS } = require("../constants/stats.json");
const { faker } = require("@faker-js/faker");
const zones = require("../constants/zones.json");


const getZones = (req, res) => {
  const { db: data, ...rest } = zones.zones;

  const resp = { data, ...rest };

  return resp;
}

const getZoneCounties = (req, res) => {
  const { zone } = req.params;

  const { db: data, ...rest } = counties[zone];

  return { data, ...rest };
};

const getCountyZones = async (req, res) => {
  let { zone, county } = req.params;

  county = county.replace(/%20|\+/g, " ");

  const [countyStats] = counties[zone].db.filter((c) => c.name === county);
  const zipCodes = await getZipCodes(county);

  const sections = {};

  sections.data = Array.from({ length: zipCodes.length }, (_, index) => {
    const promoted = faker.number.int({
      min: 10,
      max: countyStats.goal * 0.4 | 0,
    });

    return {
      name: `sección ${index + 1}`,
      promoted,
      progress: +(promoted / countyStats.goal * 100).toFixed(5),
      contributionToGlobal: +(promoted / MAX_PROMOTIONS * 100).toFixed(5),
    }
  });

  sections.meta = {
    totalPromoted: sections.data.reduce((acc, curr) => acc + curr.promoted, 0),
    totalContributionToGlobal: sections.data.reduce((acc, curr) => acc + curr.contributionToGlobal, 0),
  }

  return sections;
};

module.exports = {
  getZoneCounties,
  getCountyZones,
  getZones,
};
