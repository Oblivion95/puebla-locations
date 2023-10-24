const path = require("path");
const fs = require("fs");

(function () {
  const population = require(path.join(
    __dirname,
    "../utils/generate-puebla-population.js"
  ))();

  const json = {
    population,
  };

  fs.writeFileSync(
    path.join(__dirname, "../model/puebla-population.json"),
    JSON.stringify(json, null, 2)
  );
})();
