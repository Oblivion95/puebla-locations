const getZipCodes = require("../utils/get-zc-by-county");
const { extractJSONByZipCode } = require("../utils/extract-zip-code");
const colors = require("../constants/colors.json");

const zones = require('../constants/puebla-counties-by-zone.json')

const getStateZones = async (req, res) => {
  const fetch = (await import("node-fetch")).default;

  // const zones = await fetch(
  //   "https://firebasestorage.googleapis.com/v0/b/puebla-locations.appspot.com/o/puebla-counties-by-zone.json?alt=media&token=a0f859b6-afd7-4baf-a5be-9141d7e9eb0f&_gl=1*1ifcmk7*_ga*NTc0NDA4OTI5LjE2OTE4ODIwNzc.*_ga_CW55HF8NVT*MTY5NzU4NzI5Mi4zMC4xLjE2OTc1ODc2NTcuNDIuMC4w"
  // );

  // return zones.json();

  return zones;
};

const getZoneCounties = async (req) => {
  let { zone } = req.params;

  // const zones = await getStateZones();

  const result = zones.filter((z) => z.zone === zone);
  const { length: colorsLength } = colors;

  if (!result.length) {
    throw Error("Zone not found");
  }

  const [
    {
      geoJSON: { features },
    },
  ] = result;

  const finalResult = features.map((feature, index) => {
    const id = feature.properties.nomgeo;
    const county = id;
    feature.properties.zone = zone;
    feature.properties.county = feature.properties.nomgeo;

    return {
      geoJSON: {
        type: "FeatureCollection",
        features: [feature],
      },
      fill: colors[index % colorsLength],
      id,
      zone,
      county,
    };
  });

  return finalResult;
};

const getCountySections = async (req) => {
  const { county, zone } = req.params;
  const _county = county.replace(/\s/g, "%20");

  const zipCodes = await getZipCodes(_county);
  if (!zipCodes.length) {
    throw Error("County not found");
  }

  const features = await extractJSONByZipCode(zipCodes);
  const result = features.map((feature, index) => {
    const section = `sección-${index + 1}`;
    feature.properties.zone = zone;
    feature.properties.county = county;
    feature.properties.section = section;

    return {
      geoJSON: {
        type: "FeatureCollection",
        features: [feature],
      },
      fill: colors[index % colors.length],
      id: section,
      zone,
      county,
      section,
    };
  });

  return result;
};

module.exports = {
  getStateZones,
  getZoneCounties,
  getCountySections,
};
