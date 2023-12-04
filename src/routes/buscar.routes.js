const express = require("express");
const router = express.Router();

const { BuscarComponente } = require("../controllers/buscar.controller");

const { isAuthenticated } = require("../helpers/auth");


router.post("/Encontrar", isAuthenticated, BuscarComponente);



module.exports = router;