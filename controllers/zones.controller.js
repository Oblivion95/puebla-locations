module.exports.getCountiesZone = (req, res) => {
  const counties = require("../constants/counties-by-zone.json");

  const { zone } = req.query;

  if (!zone) {
    throw { message: "Missing zone", status: 400 };
  }

  const zoneCounties = { counties: counties[zone] };

  return zoneCounties;
};
