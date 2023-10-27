const population = require("./population-by-age.route");
const table = require("./table.route");
const routes = require("express").Router();

routes.use("/population", population);
routes.use("/table", table);

module.exports = routes;
