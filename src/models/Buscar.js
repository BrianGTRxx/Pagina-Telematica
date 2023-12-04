const { Schema, model } = require("mongoose");

const buscar = new Schema(
  {
    
    nombreC: { type: String}
    },
   
);

module.exports = model("Buscador", buscar);