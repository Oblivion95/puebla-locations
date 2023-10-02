const pueblaMap = require("../constants/puebla.json");
const colors = require("../constants/colors.json");

const extractJSONByZipCode = (zipCodes) => {
  const { features } = pueblaMap;

  const result = features
    .filter((feature) => zipCodes.includes(feature.properties.d_cp))
    .map((feature) => {
      const color = colors[(Math.random() * colors.length) | 0];

      return {
        ...feature,
        properties: {
          ...feature.properties,
          fill: color,
          stroke: color,
          "fill-opacity": 0.5,
        },
      };
    });

  return result;
};

exports.extractJSONByZipCode = extractJSONByZipCode;
