const MapsServices = require("../services/maps.services");

const getStateZones = (req, res) => {
  try {
    const resp = MapsServices.getStateZones(req, res);

    return { resp, status: 200 };
  } catch (error) {
    return { resp: error.message, status: 404 };
  }
};

const getZoneCounties = (req, res) => {
  try {
    const resp = MapsServices.getZoneCounties(req, res);

    return { resp, status: 200 };
  } catch (error) {
    return { resp: error.message, status: 404 };
  }
};

const getCountyZones = async (req, res) => {
  try {
    const resp = await MapsServices.getCountyZones(req, res);

    return { resp, status: 200 };
  } catch (error) {
    return { resp: error.message, status: 404 };
  }
};

module.exports = { getStateZones, getZoneCounties, getCountyZones };
