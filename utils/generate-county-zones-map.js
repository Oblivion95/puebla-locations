module.exports.countyZonesMap = (settings) => {
  const { zonesTotal, feature } = settings;

  const featuresLength = feature.geometry.coordinates[0][0].length;
  const isExact = featuresLength % zonesTotal === 0;
  const division = featuresLength / zonesTotal;
  const zonesLength = isExact ? division : Math.floor(division) + 1;

  const zones = Array.from({ length: zonesTotal }, (_, i) => i + 1).map(
    (zone) => `zona-${zone}`
  );

  const zonesGeoJSONArray = zones.reduce((prev, zone, index) => {
    const coordinates = feature.geometry.coordinates[0][0].slice(
      index * zonesLength,
      index * zonesLength + zonesLength
    );

    coordinates.push(coordinates[0]);

    const geoJSON = {
      type: "Feature",
      properties: {
        zone,
      },
      geometry_name: "geom",

      geometry: {
        type: "MultiPolygon",
        coordinates: [[coordinates]],
      },
    };

    return prev.concat(geoJSON);
  }, []);


  return zonesGeoJSONArray;
};
