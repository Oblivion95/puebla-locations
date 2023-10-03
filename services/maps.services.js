const { getZipCodes } = require("../utils/get-zc-by-county");
const { extractJSONByZipCode } = require("../utils/extract-zip-code");

const getZones = (req, res) => {};

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

const getZoneCounties = (req, res) => {
  let { county, zone } = req.params;
  const [{ geoJSON }] = getStateZones(req, res);

  county = county.replace(/%20|\+/g, " ");

  const resp = geoJSON.features.filter(
    (feature) => feature.properties.nomgeo === county
  );

  if (!resp.length) {
    throw Error("County not found");
  }

  return [
    {
      type: "FeatureCollection",
      features: resp,
      county,
      zone,
    },
  ];
};

const getCountyZones = async (req, res) => {
  let { county, zone } = req.params;
  county = county.replace(/\s/g, "%20");

  const zipCodes = await getZipCodes(county);
  const features = extractJSONByZipCode(zipCodes);

  if (!zipCodes.length) {
    throw Error("County not found");
  }

  return [
    {
      geoJSON: { type: "FeatureCollection", features },
      county,
      zone,
      properties: {
        county,
        zone,
      },
    },
  ];
};

module.exports = {
  getZones,
  getStateZones,
  getZoneCounties,
  getCountyZones,
};
