const router = require("express").Router();
const { put } = require("@vercel/blob");
const fs = require("fs");
const path = require("path");

async function POST(req, res) {
  const map = fs.readFileSync(path.join(__dirname, "../../constants/puebla.json"));

  const blob = await put(req.body.name || 'puebla-locations-map', map, {
    access: "public",
    contentType: "application/json",
    token: "vercel_blob_rw_cRHKBNrUO1iFR9OM_OSFBpLMZ5ukfwmnSjfbuGoaO4e2EkN",
  });

  console.log(blob);

  return res.status(200).json({
    hello: "world",
  });
}

router.post("/", POST);

router.use((req, res) => res.status(404).send("Not found"));

module.exports = router;
