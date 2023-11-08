const express = require("express");
const routes = express.Router();
const IncomeController = require("../../controllers/income.controller");

routes.get("/sources", (req, res) => {
  const result = IncomeController.getSources();

  return res.status(result.status).json(result);
});

module.exports = routes;
