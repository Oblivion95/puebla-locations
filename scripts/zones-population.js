const path = require("path");
const fs = require("fs");

(function () {
  const population = require(path.join(
    __dirname,
    "../utils/generate-zones-population.js"
  ))();

  const json = {
    population,
  };

  fs.writeFileSync(
    path.join(__dirname, "../model/zones-population.json"),
    JSON.stringify(json, null, 2)
  );
})();
