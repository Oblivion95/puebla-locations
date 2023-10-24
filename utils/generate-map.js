const map = require("../constants/puebla.json");
const zonesMap = require("../constants/puebla-counties.json");
const getZipCodes = require("../utils/get-zc-by-county");

exports.generateMap = async () => {
  const counties = zonesMap.features
    .map(({ properties }) => properties)
    .sort((a, b) => a.nomgeo.localeCompare(b.nomgeo));

  let municipalities = map.features.map(({ properties }) => properties.d_cp);

  const OFFSET = 2;
  let [start, end] = [0, 2];

  const test = counties.slice(start, end).reduce(async (acc, county) => {
    const _county = county.nomgeo;
    const zipCodes = await getZipCodes(_county);
    const finalZipCodes = zipCodes.filter((zipCode) =>
      municipalities.includes(zipCode)
    );

    return [
      ...(await acc),
      {
        county: _county,
        zipCodes: finalZipCodes,
      },
    ];
  }, Promise.resolve([]));

  test.then((data) => console.log(data));
};
