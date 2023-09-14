const fs = require("fs");
const path = require("path");
const puebla = require("./puebla.json");

(() => {
  const locations = puebla;
  const { features } = locations;

  const municipalities = features
    .slice(0, 100)
    .map((feature) => ({
      zipCode: feature.properties.d_cp,
      coordinates: feature.geometry.coordinates,
    }))
    .filter(({ coordinates }) => Array.isArray(coordinates))
    .map(({ zipCode, coordinates }) => ({
      zipCode,
      coordinates: coordinates[0].map(([longitude, latitude]) => [
        latitude,
        longitude,
      ]),
    }));
  // .reduce(
  //   (acc, { zipCode, coordinates }) => ({
  //     ...acc,
  //     [zipCode]: {
  //       zipCode,
  // coordinates: coordinates.map(([longitude, latitude]) => [
  //   latitude,
  //   longitude,
  // ]),
  //     },
  //   }),
  //   {}
  // );

  const db = {
    municipalities,
  };

  fs.writeFileSync(
    path.join(__dirname, "puebla-cp.json"),
    JSON.stringify(db, null, 2)
  );
})();
