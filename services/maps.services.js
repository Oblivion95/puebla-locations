const getStateZones = (req, res) => {
  const { zone } = req.params;
  const zones = require("../constants/puebla-counties-by-zone.json");

  if (zone) {
    const resp = zones.filter((z) => z.zone === zone);

    if (!resp.length) {
      throw Error("Zone not found");
    }

    return resp;
  }

  return zones;
};


const getCountyMunicipalities = (req, res) => {
  let { county } = req.params;
  const [{ geoJSON }] = getStateZones(req, res);

  county = county.replace(/%20|\+/g, " ")
  console.table({ county });

  const resp = geoJSON.features.filter(
    (feature) => feature.properties.nomgeo === county

  );

  if (!resp.length) {
    throw Error("County not found");
  }

  return resp;
};

module.exports = {
  getStateZones,
  getCountyMunicipalities,
};
