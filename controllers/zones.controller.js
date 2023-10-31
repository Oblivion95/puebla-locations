const getZipCodes = require("../utils/get-zc-by-county");
const counties = require("../constants/counties-by-zone.json");
const { MAX_PROMOTIONS } = require("../constants/stats.json");
const { faker } = require("@faker-js/faker");
const TableService = require("../services/table.services");
const zones = require("../constants/zones.json");

const getZones = (req, res) => {
  const resp = TableService.getZones(req, res);

  return {
    status: 200,
    data: resp,
    message: "Success",
  };
};

const getZoneCounties = (req, res) => {
  const { zone } = req.params;
  if (!zone) {
    return { message: "Missing zone", status: 400, data: null };
  }

  const resp = TableService.getZoneCounties(req, res);

  return { status: 200, data: resp, message: "Success" };
};

const getCountyZones = async (req, res) => {
  let { zone, county } = req.params;

  if (!zone) {
    return { message: "Missing zone", status: 400, data: null };
  }

  if (!county) {
    return { message: "Missing county", status: 400, data: null };
  }

  const resp = await TableService.getCountyZones(req, res);

  console.table(resp);

  return {
    status: 200,
    data: resp,
    message: "Success",
  }
};

module.exports = {
  getZoneCounties,
  getCountyZones,
  getZones,
};
