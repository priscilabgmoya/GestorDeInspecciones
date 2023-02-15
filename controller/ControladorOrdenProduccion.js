const activo = 1;
const disponibilidad = "disponible";

const selectorLinea = document.getElementById("nroLinea");
const selectorModelo = document.getElementById("tipoModelo");
const selectorColor = document.getElementById("tipoColor");

const urlModelo = `http://localhost:3308/gestionarModelo/denominacion/${activo}`;
const urlColor = `http://localhost:3308/gestionarColor/descripcion/${activo}`;


var dniUsuario = window.localStorage.getItem("dniUsuario");
var turnoIngreso = window.localStorage.getItem("turnoIngreso");

opcionesLineas(selectorLinea);
opcionesSelector(urlModelo, selectorModelo);
opcionesSelector(urlColor, selectorColor);

habilitarBotones(turnoIngreso);
cargarDatosEmpleados();

$("#btnCrearOrdenProduccion").on("click", function () {
   nro_orden_produccion= $("#inputNroOrdenProduccion").val();
   fetch(`http://localhost:3308/buscarOrdenProduccion/${nro_orden_produccion}`)
   .then((res) => verificarNroOrdenProduccion(res.status))
   .catch((error) => console.log(error));

});
function verificarNroOrdenProduccion(estadoDeRespuesta){
  if (estadoDeRespuesta === 200){
    alert('Error: Ya existe Nro de Orden de Produccion');
    location.reload();
  }else{

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
function habilitarBotones(turno){
  $("#inputTurno").val(turno);
}
$("#btnCrearOrdenProduccion").prop("disabled", false);
function opcionesSelector(url, selector) {
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

function opcionesLineas(selector) {
  fetch(`http://localhost:3308/numerosDeLineas/${disponibilidad}`)
    .then((res) => res.json())
    .then((data) => mostrarOpciones(data))
    .catch((error) => console.log(error));

  const mostrarOpciones = (data) => {
    for (let categoria of data) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = categoria.nro_linea_de_trabajo;
      selector.appendChild(nuevaOpcion);
    }
  };
}
