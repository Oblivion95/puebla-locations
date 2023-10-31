const population = require("./population-by-age.route");
const table = require("./table.route");
const routes = require("express").Router();
const incoming = require("./incoming.route");

routes.use("/population", population);
routes.use("/table", table);
routes.use("/incoming", incoming);

module.exports = routes;
