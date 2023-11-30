const express = require("express");
const router = express.Router();

const { guardarSensor, listarSensor, registrarSensor, PostvalorIOT, Componente } = require("../controllers/principal.controller");

const { isAuthenticated } = require("../helpers/auth");



router.post("/principal/guardar", isAuthenticated,guardarSensor);
router.get("/mostrarsensores", isAuthenticated, listarSensor);
router.get("/registro", isAuthenticated, registrarSensor);
router.get("/Componentes", isAuthenticated, Componente);
router.post("/telematica/soso", PostvalorIOT);

module.exports = router;