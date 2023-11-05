const { Schema, model } = require("mongoose");

const Panelguardar = new Schema(
  {
    
    nombre: { type: String},
    panel: { type: String},
    Horas: { type: Number},
    },
   
);

module.exports = model("Datosdepanel", Panelguardar);