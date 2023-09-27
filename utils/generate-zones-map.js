exports.zonesMap = ((mapType) => {
  const map = require("../constants/puebla-counties.json");
  const { zones } = require("../constants/zones.json");
  const { length: zonesLength } = zones;

  const countiesPerZone = map.totalFeatures / zonesLength;

  const mapFeatures = zones.reduce(
    (prev, { name: zone, color: fill }, index) => {
      const step = index * countiesPerZone;

      const v = map.features
        .sort(
          (a, b) =>
            b.geometry.coordinates[0][0][0][1] -
            a.geometry.coordinates[0][0][0][1]
        )
        .slice(step, step + countiesPerZone)
        .map((feature) => ({
          ...feature,
          zone,
          properties: {
            ...feature.properties,
            zone,
            fill,
          },
        }));

      return prev.concat({ geoJSON: {  type: "FeatureCollection", features: v }, zone, fill });
    },
    []
  );

  if (mapType === "featureArray") return mapFeatures;

  map.features = mapFeatures;

  return map;
})("featureArray");
