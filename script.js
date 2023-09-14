const fs = require("fs");
const path = require("path");
const puebla = require("./puebla.json");

(() => {
  const locations = puebla;
  const { features } = locations;

  const _locations =
    features.slice(0, 10)
      .map((feature) => ({ zipCode: feature.properties.d_cp, coordinates: feature.geometry.coordinates }))
      .filter(({ coordinates }) => Array.isArray(coordinates)).map(({ zipCode, coordinates }) => ({ zipCode, coordinates: coordinates[0] })).reduce((acc, { zipCode, coordinates }) => ({ ...acc, [zipCode]: {
        zipCode,
        coordinates
      } }), {});

  fs.writeFileSync(
    path.join(__dirname, "puebla-cp.json"),
    JSON.stringify(_locations, null, 2)
  );
})();
