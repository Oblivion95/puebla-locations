const getZipCodes = require("../utils/get-zc-by-county");
const counties = require("../constants/counties-by-zone.json");
const { MAX_PROMOTIONS } = require("../constants/stats.json");
const { faker } = require("@faker-js/faker");
const incomesByZone = require("../constants/incomes-by-zone.json");
const { data: incomesByCounty} = require("../constants/incomes-by-county.json");
const incomeSources = require("../constants/income-sources.json");

const getZonesIncomes = (req, res) => {
  return {
    status: 200,
    data: {
      data: incomesByZone.db,
      meta: incomesByZone.meta,
    },
    message: "Success",
  };
};

const getZoneCounties = (req, res) => {
  const { zone } = req.params;

  const resp = incomesByCounty[zone];

  return resp;
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

    const total = promoted;
    const { length } = incomeSources;

    return {
      name: `sección ${index + 1}`,
      promoted,
      progress: +(promoted / countyStats.goal * 100).toFixed(5),
      contributionToGlobal: +(promoted / MAX_PROMOTIONS * 100).toFixed(5),
      incomeTable: incomeSources.reduce((acc, curr) => {
        const incomeSourceTotal = faker.number.int({
          min: 1,
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
      }, {}),
    }
  });

  sections.meta = {
    totalPromoted: sections.data.reduce((acc, curr) => acc + curr.promoted, 0),
    totalContributionToGlobal: sections.data.reduce((acc, curr) => acc + curr.contributionToGlobal, 0),
  }

  return sections;
};

const getSources = () => {
  const data = require("../constants/income-data.json");

  return data;
}

module.exports = {
  getZoneCounties,
  getCountyZones,
  getZonesIncomes,
  getSources,
};
