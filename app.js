// const http = require('http');
// const fs = require('fs');

// http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Content-type', 'text/html');

//   let path = './view';

//   switch (req.url) {
//     case '/': case '/index.html':
//       path += '/index.html';
//       break;
//     case '/about': case '/about.html':
//       path += '/about.html';
//       break;

//     case '/about-me':
//         res.statusCode = 301;

//         res.setHeader('Location', '/about');
//         res.end();
//       break;

//     default:
//       path += '/404.html';
//       break;
//   }

//   const view = fs.readFileSync(path);

//   res.end(view);
// }).listen(3001, () => {
//   console.log('listening on port 3001')
// });

const express = require("express");
const app = express();
const cors = require("cors");
const mapRoutes = require("./routes/location/map.route");
const apiRoutes = require("./routes/api");
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/api", apiRoutes);
app.use("/maps", mapRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;

// JSON Server module
// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("puebla-cp.json");

// // Make sure to use the default middleware
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// // Add this before server.use(router)
// server.use(
//  // Add custom route here if needed
//  jsonServer.rewriter({
//   "/api/*": "/$1",
//   "/municipalities/*": "/municipalities?zipCode=$1"
//  })
// );
// server.use(router);
// // Listen to port
// server.listen(8080, () => {
//  console.log("JSON Server is running");
// });

// // Export the Server API
// module.exports = server;
