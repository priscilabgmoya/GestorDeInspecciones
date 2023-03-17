const disponibilidad = "disponible";
const activa = 0;
const en_proceso = 3;
const pausada = 1; 
const finalizada = 2; 
const selectorLinea = document.getElementById("listadoNroLinea");
const selectorModelo = document.getElementById("listadoModelo");
const selectorColor = document.getElementById("listadoColor");
const date = new Date();
const localHost = 'http://localhost:3308/';
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
  fetch(`${localHost}nombreApellidoUsuario/${dniUsuario}`)
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
  fetch(`${localHost}coloresDescripcion`)
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
  fetch(`${localHost}modeloDenominacion`)
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
  fetch(`${localHost}numerosDeLineas/${disponibilidad}`)
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
fetch(`${localHost}crearOrdenProduccion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaOrdenProduccion),
      }).then(res => estadoOrden(res.status))
      .catch((error) => console.log(error));
const estadoOrden =  (estado)=>{
  if(estado === 201){
    alert('Orden de Produccion Creada');
  }
  if(estado === 409){
    alert('Orden de Produccion Ya existente');
  }
  if(estado === 400){
    alert('Error: falta informacion de nro de orden y/o color y/o linea y/o modelo');
  }
  if(estado === 404){
    alert('Error: la informacion de color y/o linea y/o modelo propocionada no existe');
  }
  if(estado === 500){
    alert('Error: no se creo orden de produccion ');
  }
}
  
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
  fetch(`${localHost}cambiarEstadoOrdenProduccion`, {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(cambiarEstado),
 }).catch((error) => console.log(error));
location.reload();
}
