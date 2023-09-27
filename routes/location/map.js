const router = require("express").Router();

router.get("/zones", (req, res) => {
  const resp = require("../../controllers/maps.controller").getStateZones(req, res);

  return res.json(resp);
});

module.exports = router;
