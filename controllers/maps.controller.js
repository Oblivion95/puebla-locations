const MapsServices = require("../services/maps.services");

const getStateZones = (req, res) => {
  try {
    const resp = MapsServices.getStateZones(req, res);

    return { resp, status: 200 };
  } catch (error) {
    return { resp: error.message, status: 404 };
  }
};

const getCountyMunicipalities = (req, res) => {
  try {
    const resp = MapsServices.getCountyMunicipalities(req, res)

    return { resp, status: 200 };
  } catch (error) {
    return { resp: error.message, status: 404 };
  }
};

module.exports = { getStateZones, getCountyMunicipalities };
