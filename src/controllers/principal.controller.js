const principalCtrl = {};

const Sensores = require("../models/Sensor");
const Datos = require("../models/Panel");


principalCtrl.registrarSensor = (req, res) => {
  res.render('principal/Registro');

};


principalCtrl.Componente = (req, res) => {
  res.render('principal/Componentes');

};

principalCtrl.listarSensor = async (req, res) => {

  const listadosensores = await Sensores.find();
  console.log(listadosensores)
  res.render('principal/lista', {listadosensores})
};

//Ruta que estará en el boton Guardar

principalCtrl.PostvalorIOT = async (req, res) => {
  var DatosSensor = req.body;
  console.log(DatosSensor);
  var token = DatosSensor.token;
  var token1 = DatosSensor.token1;
  var token2 = DatosSensor.token2;
  const nombre = token;
  const panel = token1;
  const Horas = token2;
  console.log(token);
  if (token){
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: "Dato recibido"
    }
    res.send(respuesta);
  }
  else{
    respuesta = {
      error: true,
      codigo: 501,
      mensaje: "Error"
    }
    res.send(respuesta);
  }
  const NewDatos = new Datos({
    nombre,
    panel,
    Horas,
  });
  await NewDatos.save();
 
}

principalCtrl.guardarSensor = async (req, res) => {
    const {
      nombre,
      ubicacion,
      tipo,
      latitud,
      longitud
       } = req.body;
   
  
    const errors = [];
    if (!nombre) {
      errors.push({ text: "Por favor indique Nombre bien" });
    }
    if (!ubicacion) {
      errors.push({ text: "Por favor indique bien la ubicacion" });
    }
    if (!tipo) {
      errors.push({ text: "Por favor indique tipo producto" });
    }
    if (!latitud) {
      errors.push({ text: "Por favor indique latitud" });
    }
    if (!longitud) {
      errors.push({ text: "Por favor indique  longitud" });
    }
    if (errors.length > 0) {
      res.render("/", {
        nombre,
        ubicacion,
        tipo,
        latitud,
        longitud
      });
    } else {
      const newSensor = new Sensores({
        nombre,
        ubicacion,
        tipo,
        latitud,
        longitud
      });
      newSensor.user = req.user.id;
      await newSensor.save();
      req.flash("success_msg", "Producto adicionado correctamente");
      res.redirect("/mostrarsensores");

  
  }
  };


  
module.exports = principalCtrl;