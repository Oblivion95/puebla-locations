const getZipCodes = require("../utils/get-zc-by-county");
const counties = require("../constants/counties-by-zone.json");
const { MAX_PROMOTIONS } = require("../constants/stats.json");
const { faker } = require("@faker-js/faker");
const incomesByZone = require("../constants/incomes-by-zone.json");

const IncomeController = require("../services/income.service");

const getZonesIncomes = (req, res) => {
  return {
    status: 200,
    data: incomesByZone.db,
    message: "Success",
  };
};

const getZoneCounties = (req, res) => {
  const { zone } = req.params;

  if (!zone) {
    return { message: "Missing zone", status: 400, data: null };
  }

  const zoneCounties = IncomeController.getZoneCounties(req, res);

  return { data: zoneCounties, status: 200, message: "Success" };
};

const getCountyZones = async (req, res) => {
  let { zone, county } = req.params;

  if (!zone) {
    throw { message: "Missing zone", status: 400 };
  }

  if (!county) {
    throw { message: "Missing county", status: 400 };
  }

  const countyZones = await IncomeController.getCountyZones(req, res);

  return { data: countyZones, status: 200, message: "Success" };
};

module.exports = {
  getZoneCounties,
  getCountyZones,
  getZonesIncomes,
};
