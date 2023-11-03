const fs = require("fs");
const path = require("path");

(() => {
  const { generateIncomesByZone } = require("../utils/generate-incomes-by-county");
  const result = generateIncomesByZone();

  console.log(result);

  try {
    fs.writeFileSync(
      path.join(__dirname, "../constants/incomes-by-county.json"),
      JSON.stringify(result, undefined, 2)
    );
  } catch (error) {
    console.log(error);
  }

})();
