const disponibilidad = "disponible";
const activa = 0;
const en_proceso = 3;
const pausada = 1; 
const finalizada = 2; 
const selectorLinea = document.getElementById("listadoNroLinea");
const selectorModelo = document.getElementById("listadoModelo");
const selectorColor = document.getElementById("listadoColor");
const date = new Date();


var dniUsuario = window.localStorage.getItem("dniUsuario");
var turnoIngreso = window.localStorage.getItem("turnoIngreso");


opcionesLineas(selectorLinea);
opcionesModelo(selectorModelo);
opcionesColor(selectorColor);


cargarDatosEmpleados();

$("#btnCrearOrdenProduccion").on("click", function () {
  crearOrdenProduccion();
});

function cargarDatosEmpleados() {
  fetch(`http://localhost:3308/nombreApellidoUsuario/${dniUsuario}`)
    .then((res) => res.json())
    .then((data) => cargarNombre(data[0]))
    .catch((error) => console.log(error));
  const cargarNombre = (data) => {
    $("#inputSupervisorLinea").val(` ${data.nombre} ${data.apellido}`);
    habilitarBotones(turnoIngreso);
  };
}
function habilitarBotones(turno) {
  
  if (turno === "mañana" || turno === "tarde") {
    $("#inputTurno").val(turno);
    $("#btnCrearOrdenProduccion").prop("disabled", false);
    $("#inputNroOrdenProduccion").prop("disabled", false);
    $("#inputNroLinea").prop("disabled", false);
    $("#inputModelo").prop("disabled", false);
    $("#inputColor").prop("disabled", false);
  }

  if (turno === "undefined") {
    alert("Fuera del Turno de Trabajo");
  }
}

function opcionesColor(selector) {
  fetch(`http://localhost:3308/coloresDescripcion`)
    .then((res) => res.json())
    .then((data) => mostrarOpciones(data))
    .catch((error) => console.log(error));

  const mostrarOpciones = (data) => {
    for (let categoria of data) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = categoria.descripcion;
      selector.appendChild(nuevaOpcion);
    }
  };
}
function opcionesModelo(selector) {
  fetch(`http://localhost:3308/modeloDenominacion`)
    .then((res) => res.json())
    .then((data) => mostrarOpciones(data))
    .catch((error) => console.log(error));

  const mostrarOpciones = (data) => {
    for (let categoria of data) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = categoria.denominacion;
      selector.appendChild(nuevaOpcion);
    }
  };
}

function opcionesLineas(selector) {
  fetch(`http://localhost:3308/numerosDeLineas/${disponibilidad}`)
    .then((res) => res.json())
    .then((data) => mostrarOpciones(data))
    .catch((error) => console.log(error));

  const mostrarOpciones = (data) => {
    for (let categoria of data) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = categoria.nro_linea_de_trabajo;
      selector.appendChild(nuevaOpcion);
    }
  };
}

function crearOrdenProduccion() {
  
  /**
   * Creamos el objeto orden de produccion
   */
  let nuevaOrdenProduccion = {
    nro_orden_produccion: parseInt($("#inputNroOrdenProduccion").val()),
    id_color: $("#inputColor").val(),
    fecha:
      "" +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate(),
    estado: activa,
    linea: parseInt($("#inputNroLinea").val()),
    sku:$("#inputModelo").val(),

  };
/**
 * Guardamos la orden de produccion en el DB
 */
fetch(`http://localhost:3308/crearOrdenProduccion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaOrdenProduccion),
      }).catch((error) => console.log(error));
      alert('Orden de Produccion Creada');
  
}

function generateID() {
  var pass = "";
  var str = "0123456789";
  for (let i = 1; i <= 6; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  return pass;
}

$('#btnPausarOrdenProduccion').on('click', function(){
  cambiarEstadoOrdenProduccion(pausada)
});

$('#btnContinuarOrdenProduccion').on('click', function(){
  cambiarEstadoOrdenProduccion(en_proceso)
});
$('#btnFInalizarOrdenProduccion').on('click', function(){
  
});

$('#btnCancelarOrdenProduccion').on('click', function(){
  window.location.reload()
});

function cambiarEstadoOrdenProduccion(estado){
  var  nro_orden = parseInt($("#inputNroOrdenProduccion").val());
  var cambiarEstado = {
        nroOrden: nro_orden,
        estado: estado
  }
  fetch(`http://localhost:3308/cambiarEstadoOrdenProduccion`, {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(cambiarEstado),
 }).catch((error) => console.log(error));
location.reload();
}
