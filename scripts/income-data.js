const fs = require("fs");
const path = require("path");

(() => {
  const { getSources } = require("../utils/generate-incomes-data");

  try {
    fs.writeFileSync(
      path.join(__dirname, "../constants/income-data.json"),
      JSON.stringify(getSources(), undefined, 2)
    );
  } catch (error) {
    console.log(error);
  }

})();
