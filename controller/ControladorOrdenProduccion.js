const disponibles = 1;
const disponibilidad = "disponible";
const activa = 0;
const selectorLinea = document.getElementById("listadoNroLinea");
const selectorModelo = document.getElementById("listadoModelo");
const selectorColor = document.getElementById("listadoColor");
const date = new Date();
const urlModelo = `http://localhost:3308/modeloDenominacion/${disponibles}`;
const urlColor = `http://localhost:3308/coloresDescripcion/${disponibles}`;

var dniUsuario = window.localStorage.getItem("dniUsuario");
var turnoIngreso = window.localStorage.getItem("turnoIngreso");

let nuevaJornadaLaboral ={}

opcionesLineas(selectorLinea);
opcionesModelo(urlModelo, selectorModelo);
opcionesColor(urlColor, selectorColor);

habilitarBotones(turnoIngreso);
cargarDatosEmpleados();

$("#btnCrearOrdenProduccion").on("click", function () {
  nro_orden_produccion = $("#inputNroOrdenProduccion").val();
  fetch(`http://localhost:3308/buscarOrdenProduccion/${nro_orden_produccion}`)
    .then((res) => verificarNroOrdenProduccion(res.status))
    .catch((error) => console.log(error));
});
function verificarNroOrdenProduccion(estadoDeRespuesta) {
  if (estadoDeRespuesta === 200) {
    alert("Error: Ya existe Nro de Orden de Produccion");
    location.reload();
  } else {
    crearOrdenProduccion();
  }
}
function cargarDatosEmpleados() {
  fetch(`http://localhost:3308/nombreApellidoUsuario/${dniUsuario}`)
    .then((res) => res.json())
    .then((data) => cargarNombre(data[0]))
    .catch((error) => console.log(error));
  const cargarNombre = (data) => {
    $("#inputSupervisorLinea").val(` ${data.nombre} ${data.apellido}`);
  };
}
function habilitarBotones(turno) {
  $("#inputTurno").val(turno);

  if (turno === "mañana" || turno === "tarde") {
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

function opcionesColor(url, selector) {
  fetch(`${url}`)
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
function opcionesModelo(url, selector) {
  fetch(`${url}`)
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
   * Creamos la jornada laboral 
   */
  crearJornadaLaboral();
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
    id_jornada_laboral: parseInt( nuevaJornadaLaboral.id_jornada_laboral)
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
function crearJornadaLaboral() {

  nuevaJornadaLaboral.id_jornada_laboral = parseInt(generateID())
  nuevaJornadaLaboral.idturno = parseInt(window.localStorage.getItem("idturnoIngreso"))
console.log(nuevaJornadaLaboral)
      fetch(`http://localhost:3308/jornadaLaboral/agregarJornada`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaJornadaLaboral),
      }).catch((error) => console.log(error));
    
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