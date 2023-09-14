const express = require("express");
const app = express();
const locations = require("./puebla-cp.json");

const port = 3001;

app.use(express.json());

app
  .get("/api/locations", (req, res) => {
    const { "zip-code": zipCode } = req.query;

    console.log(zipCode);

    if (zipCode) {
      const result = locations[zipCode];

      if (!result) return res.status(404).json({ success: false, message: "Not found" });

      return res.json(result);
    };

    res.json({ locations });
  })
  .get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
