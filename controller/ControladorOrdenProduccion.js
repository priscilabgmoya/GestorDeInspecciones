const activo = 1;
const disponibilidad = "disponible";

const selectorLinea = document.getElementById("nroLinea");
const selectorModelo = document.getElementById("tipoModelo");
const selectorColor = document.getElementById("tipoColor");

const urlModelo = `http://localhost:3308/gestionarModelo/denominacion/${activo}`;
const urlColor = `http://localhost:3308/gestionarColor/descripcion/${activo}`;

var dniUsuario = localStorage.getItem("dniUsuario");
let turnosCargados = {};


  opcionesLineas(selectorLinea);
  opcionesSelector(urlModelo, selectorModelo);
  opcionesSelector(urlColor, selectorColor);
  cargarTurnos();
  cargarDatosEmpleados();


$("#btnCrearOrdenProduccion").on("click", function () {

  
});

function cargarDatosEmpleados() {
  const date = new Date();
  var horaIngreso = date.toLocaleTimeString();
  if (
    horaIngreso >= turnosCargados.hora_entrada_tarde &&
    horaIngreso <= turnosCargados.hora_salida_tarde
  ) {
    $("#inputTurno").val(turnosCargados.descripcion_tarde);
  }
  if (
    horaIngreso >= turnosCargados.hora_entrada_mañana &&
    horaIngreso <= turnosCargados.hora_salida_mañana
  ) {
    $("#inputTurno").val(turnosCargados.descripcion_mañana);
  } else {
    alert("Fuera de Rango de Trabajo");
  }
  fetch(`http://localhost:3308/nombreApellidoUsuario/${dniUsuario}`)
    .then((res) => res.json())
    .then((data) => cargarNombre(data[0]))
    .catch((error) => console.log(error));
  const cargarNombre = (data) => {
    $("#inputSupervisorLinea").val(` ${data.nombre} ${data.apellido}`);
  };
}
function cargarTurnos() {
  fetch(`http://localhost:3308/turnosDisponibles`)
    .then((res) => res.json())
    .then((data) => obtenerTurno(data))
    .catch((error) => console.log(error));

  const obtenerTurno = (dato) => {
    dato.forEach((turnos) => {
      if (turnos.descripcion === "mañana") {
        turnosCargados.descripcion_mañana = turnos.descripcion;
        turnosCargados.hora_entrada_mañana = turnos.hora_entrada;
        turnosCargados.hora_salida_mañana = turnos.hora_salida;
      } else {
        turnosCargados.descripcion_tarde = turnos.descripcion;
        turnosCargados.hora_entrada_tarde = turnos.hora_entrada;
        turnosCargados.hora_salida_tarde = turnos.hora_salida;
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
