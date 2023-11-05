const express = require("express");
const router = express.Router();

const { guardarSensor, listarSensor, registrarSensor, PostvalorIOT  } = require("../controllers/principal.controller");

const { isAuthenticated } = require("../helpers/auth");



router.post("/principal/guardar", isAuthenticated,guardarSensor);
router.get("/mostrarsensores", isAuthenticated, listarSensor);
router.get("/registro", isAuthenticated, registrarSensor);
router.post("/telematica/soso", PostvalorIOT);

module.exports = router;