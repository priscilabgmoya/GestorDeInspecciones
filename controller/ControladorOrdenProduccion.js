const activo = 1;
const disponibilidad = "disponible";

const selectorLinea = document.getElementById("nroLinea");
const selectorModelo = document.getElementById("tipoModelo");
const selectorColor = document.getElementById("tipoColor");

const urlModelo = `http://localhost:3308/gestionarModelo/denominacion/${activo}`;
const urlColor = `http://localhost:3308/gestionarColor/descripcion/${activo}`;


var dniUsuario = window.localStorage.getItem("dniUsuario");


opcionesLineas(selectorLinea);
opcionesSelector(urlModelo, selectorModelo);
opcionesSelector(urlColor, selectorColor);

cargarTurnos();
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
function cargarTurnos() {
  const date = new Date();
  var horaIngreso = date.toLocaleTimeString();

  fetch(`http://localhost:3308/turnosDisponibles`)
    .then((res) => res.json())
    .then((data) => obtenerTurno(data))
    .catch((error) => console.log(error));

  const obtenerTurno = (dato) => {
    dato.forEach((turnos) => {
      if (
        turnos.descripcion === "mañana" &&
        horaIngreso >= turnos.hora_entrada &&
        horaIngreso <= turnos.hora_salida
      ) {
        $("#inputTurno").val(turnos.descripcion);
        $("#btnCrearOrdenProduccion").prop("disabled", false);
      }
      if (
        turnos.descripcion === "tarde" &&
        horaIngreso >= turnos.hora_entrada &&
        horaIngreso <= turnos.hora_salida
      ) {
        $("#inputTurno").val(turnos.descripcion);
        $("#btnCrearOrdenProduccion").prop("disabled", false);
      }
      else {
        $("#inputTurno").val('fuera de rango de horario');
      }
    });
  };
}
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
