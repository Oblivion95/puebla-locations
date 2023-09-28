const getCountiesZone = (req, res) => {
  const counties = require("../constants/counties-by-zone.json");

  const { zone } = req.params;

  if (!zone) {
    throw { message: "Missing zone", status: 400 };
  }

  const zoneCounties = { counties: counties[zone] };

  return zoneCounties;
};

const getMunicipalitiesCounty = (req, res) => {
  const municipalities = require("../constants/municipalities-by-county.json");

  const { county } = req.params;

  if (!county) {
    throw { message: "Missing county", status: 400 };
  }

  const countyMunicipalities = { municipalities: municipalities[county] };

  return countyMunicipalities;
};

module.exports = {
  getCountiesZone,
  getMunicipalitiesCounty,
};
