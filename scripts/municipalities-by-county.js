const fs = require("fs");
const path = require("path");

(() => {
  const { municipalities } = require("../utils/generate-counties-by-zone");

  try {
    fs.writeFileSync(
      path.join(__dirname, "../constants/counties-by-zone.json"),
      JSON.stringify(municipalities, undefined, 2)
    );
  } catch (error) {
    console.log(error);
  }

})();
