const colors = require("../constants/colors.json");

const extractJSONByZipCode = async (zipCodes) => {
  const fetch = (await import("node-fetch")).default;

  // const res = await fetch(
  //   "https://firebasestorage.googleapis.com/v0/b/puebla-locations.appspot.com/o/puebla.json?alt=media&token=7098ea24-666b-4674-b080-fbd1f93d5308&_gl=1*1kek0a3*_ga*NTc0NDA4OTI5LjE2OTE4ODIwNzc.*_ga_CW55HF8NVT*MTY5NzU4NzI5Mi4zMC4xLjE2OTc1ODc0MzkuNjAuMC4w"
  // );

  // const pueblaMap = await res.json();

  const pueblaMap = require("../constants/puebla.json");

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
