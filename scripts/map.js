const fs = require("fs");
const path = require("path");

(() => {
  const { zonesMap } = require("../utils/generate-zones-map");

  try {
    fs.writeFileSync(
      path.join(__dirname, "../constants/puebla-counties-by-zone.json"),
      JSON.stringify(zonesMap, undefined, 2)
    );
  } catch (error) {
    console.log(error);
  }

})();
