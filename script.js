const fs = require("fs");
const path = require("path");

(() => {
  const locations = require("./puebla.json");
  const { features } = locations;
  const zonesLength = 9;

  const zones = Array.from({ length: zonesLength }, (_, i) => i + 1).map(
    (zone) => `zona-${zone}`
  );
  const pages = 10;

  let municipalities = features
    .slice(0, zonesLength * pages)
    .map((feature) => ({
      zipCode: feature.properties.d_cp,
      coordinates: feature.geometry.coordinates,
      ...feature
    }))
    .filter(({ coordinates, zipCode, ...rest }) => {
      if (!Array.isArray(coordinates)) console.log(rest);

      return Array.isArray(coordinates);
    })
    .map(({ zipCode, coordinates }) => ({
      zipCode,
      coordinates: coordinates[0].map(([longitude, latitude]) => [
        latitude,
        longitude,
      ]),
    }));

  municipalities = zones.reduce((prev, zone, index) => {
    const municipalitiesSlice = municipalities.slice(
      index * zonesLength,
      index * zonesLength + zonesLength
    );

    const v = prev.concat(
      municipalitiesSlice.map((municipality) => ({
        ...municipality,
        zone,
      }))
    );

    return v;
  }, []);

  let puebla_boundary = require("./puebla-boundary.json").features[0].geometry.coordinates[0][0].map(([longitude, latitude]) => [latitude, longitude]);

  const db = {
    municipalities,
    puebla: { coordinates: puebla_boundary },
  };

  fs.writeFileSync(
    path.join(__dirname, "puebla-cp.json"),
    JSON.stringify(db, null, 2)
  );
})();
