const MapsServices = require("../services/maps.services");

const getStateZones = async (req, res) => {
  try {
    const resp = await MapsServices.getStateZones(req, res);

    return { resp, status: 200 };
  } catch (error) {
    return { resp: error.message, status: 404 };
  }
};

const getZoneCounties = async (req, res) => {
  try {
    const resp = await MapsServices.getZoneCounties(req, res);

    return { resp, status: 200 };
  } catch (error) {
    return { resp: error.message, status: 404 };
  }
};

const getCountySections = async (req, res) => {
  try {
    console.log('getCountySections: ')
    const resp = await MapsServices.getCountySections(req, res);
    console.log(resp)

    return { resp, status: 200 };
  } catch (error) {
    return { resp: error.message, status: 404 };
  }
};

module.exports = { getStateZones, getZoneCounties, getCountySections };
