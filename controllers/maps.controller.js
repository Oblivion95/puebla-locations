module.exports.getStateZones = (req, res) => {
  const { zone } = req.query;
  const zones = require("../constants/puebla-counties-by-zone.json");

  if (zone) {
    const resp = zones.filter((z) => z.zone === zone);

    return resp;
  }

  return zones;
};
