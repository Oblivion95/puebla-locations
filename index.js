// const express = require("express");
// const app = express();
// const locations = require("./puebla-cp.json");
// const cors = require("cors");

// const port = 3001;

// app.use(express.json());
// app.use(cors());

// app
//   .get("/api/locations", (req, res) => {
//     const { "zip-code": zipCode } = req.query;

//     console.log(zipCode);

//     if (zipCode) {
//       const result = locations[zipCode];

//       if (!result) return res.status(404).json({ success: false, message: "Not found" });

//       return res.json(result);
//     };

//     res.json({ locations });
//   })
//   .get("/", (req, res) => {
//     res.status(200).send("Hello World!");
//   });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// JSON Server module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("puebla-cp.json");

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
 // Add custom route here if needed
 jsonServer.rewriter({
  "/api/*": "/$1",
 })
);
server.use(router);
// Listen to port
server.listen(8080, () => {
 console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;

