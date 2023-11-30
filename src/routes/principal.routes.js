const express = require("express");
const router = express.Router();

 

const {

    irCalcularDimensiones,
    iracalcular,
    irparametros,
    guardarSensor,
    registrarSensor,
    listarSensor

}= require("../controllers/principal.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");
router.post("/principal/guardarSensor", isAuthenticated, guardarSensor);
router.get("/registrarsensores", isAuthenticated, registrarSensor);
router.get("/mostrarsensores", listarSensor);
router.get("/principal/calculardimensiones", irCalcularDimensiones);
router.get("/principal/irparametro", isAuthenticated,irparametros);

router.post("/principal/iracalcular", isAuthenticated, iracalcular);


module.exports = router;