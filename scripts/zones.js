const path = require('path');
const fs = require('fs');

(() => {
  const zonesTuple = require('../utils/generate-zones').zones;

  const zones = {
    zones: zonesTuple,
  }

  try {
    fs.writeFileSync(path.join(__dirname, '../constants/zones.json'), JSON.stringify(zones, null, 2));
  } catch (error) {
    console.log(error);
  }
})();
