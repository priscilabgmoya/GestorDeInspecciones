var id_turno = parseInt( window.localStorage.getItem("idturnoIngreso"));
var dniUsuario = parseInt( window.localStorage.getItem("dniUsuario"));
const selectorHora = document.getElementById("btnGrupoHoras");
const date = new Date();
const en_proceso = 3;
const primera = 0;
const defecto =1;
const urlDefectoObservado = "http://localhost:3308/obtenerTipoDefectoObservado"
const urlDefectoReproceso = "http://localhost:3308/obtenerTipoDefectoReproceso"
const bodyDerechoObservado = document.getElementById("tablaPieDerechoObservado");
const bodyIzquierdoObservado = document.getElementById("tablaPieIzquierdoObservado");
const bodyDerechoReproceso = document.getElementById("tablaPieDerechoReporceso");
const bodyIzquierdoReproceso = document.getElementById("tablaPieIzquierdoReproceso");
const selectorLinea = document.getElementById("listadoNroLinea");

opcionesLineas(selectorLinea);

fetch(`http://localhost:3308/buscarJornadaLaboral/${dniUsuario}`)
  .then((res) => seleccionarLinea(res.status))
  .catch((error) => console.log(error));

function seleccionarLinea(estadoDeRespuesta) {
  if (estadoDeRespuesta === 404) {
    $("#ventanaSeleccionarLineaModal").modal("show");
    $("#btnInspeccionarLinea").on("click", function () {
      agregarEmpleadoJornadaLaboral();
    });
  } else {
   alert("ya tiene una orden de produccion");
    // cambiar el turno de ingreso de la jornada laboral???
    cargarDatosEmpleados();
  }
}

cargarDefectos(urlDefectoObservado, bodyDerechoObservado,"derechoObservado");
cargarDefectos(urlDefectoObservado,bodyIzquierdoObservado,"izquierdoObservado");
cargarDefectos(urlDefectoReproceso,bodyDerechoReproceso,"derechoReproceso");
cargarDefectos(urlDefectoReproceso,bodyIzquierdoReproceso,"izquierdoReproceso");



function cargarDatosEmpleados() {
  fetch(`http://localhost:3308/supervisorCalidadAsociadoLinea/${dniUsuario}`)
    .then((res) => res.json())
    .then((data) => cargarNombre(data[0]))
    .catch((error) => console.log(error));

  const cargarNombre = (data) => {
    document.querySelector("#nroOrden").innerText =data.nro_produccion;
    document.querySelector("#turno").innerText= data.turno;
    document.querySelector("#modelo").innerText = data.modelo;
    document.querySelector("#color").innerText = data.color;
    document.querySelector("#linea").innerText = data.nro_linea;
    document.querySelector("#estado").innerText = data.estado;
    window.localStorage.setItem("jornada", data.id_jornada_laboral);
   
    cargarTurnoInspeccion(id_turno);
  };
}

function agregarEmpleadoJornadaLaboral() {

  var nro_linea = parseInt($("#lineaAinspeccionar").val());

    let jornadaAsociada = {
      
    id_jornada_laboral: parseInt(generateID()),
    dni_empleado: dniUsuario,
    idturno: id_turno,
    fecha_inicio:  "" + date.getFullYear() + "-" + (date.getMonth() + 1) +"-" +date.getDate(),
    estado: en_proceso,
    linea: nro_linea
  };

    fetch(`http://localhost:3308/agregarJornada`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jornadaAsociada),
    }).catch((error) => console.log(error));
  };

  function generateID() {
    var pass = "";
    var str = "0123456789";
    for (let i = 1; i <= 6; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    return pass;
  }

function cargarTurnoInspeccion(turno){
  fetch(`http://localhost:3308/horarioTurno/${turno}`)
    .then((res) => res.json())
    .then((data) => cargarHorarioTurno(data[0].hora_entrada,data[0].hora_salida))
    .catch((error) => console.log(error));

  function cargarHorarioTurno(hora_entrada,hora_salida) {

   var entrada =  hora_entrada.split(":");
     var salida = hora_salida.split(":");
     var horaSalida = parseInt(salida[0]);
     let i =0 ; 
    do {
      var numHoraEntrada = parseInt(entrada[0])+i ;
       var horaEntrada = numHoraEntrada +":00";
       let boton = document.createElement("button");
       boton.type = "button";
       boton.className = "btn btn-outline-secondary"; 
       boton.id = "btnInspeccion"+numHoraEntrada;
       boton.innerText = horaEntrada;
       boton.onclick = cargarInspeccion
       selectorHora.appendChild(boton)
       i++;
  }while(numHoraEntrada !== horaSalida)

  }

}


function cargarDefectos(url, tablaDefecto, id){
  fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => mostrarDefecto(data))
    .catch((error) => console.log(error));

const  mostrarDefecto = (defectos) =>{
  let i = 1;
  defectos.forEach(defecto => {
    let fila = document.createElement("tr");

    columna = document.createElement("td");
    columna.innerText = defecto.descripcion;
    fila.appendChild(columna);

    columna = document.createElement("td");
    let btnEliminarDefecto = crearBoton();
    btnEliminarDefecto.className = "btn btn-danger  btnEniminarDefecto"+i;
    btnEliminarDefecto.innerText = "-";

    let btnSumarDefecto = crearBoton();
    btnSumarDefecto.className = "btn btn-success  btnSumarDefecto"+i;
    btnSumarDefecto.innerText = "+";

    let inputDefecto = document.createElement("input");
    inputDefecto.className= " text-center mx-2 px-1";
    inputDefecto.type = "number";
    inputDefecto.id = id + "Defecto"+i;
    inputDefecto.value= "0";
    inputDefecto.style = "width: 30%; border: none;"
    inputDefecto.readOnly= true;

    columna.appendChild(btnEliminarDefecto);
    columna.appendChild(inputDefecto);
    columna.appendChild(btnSumarDefecto);
    fila.appendChild(columna); 
    tablaDefecto.appendChild(fila);
    i++;
  });
}
}
function crearBoton() {
  let boton = document.createElement("button");
  boton.type = "button";
  return boton;
}

function opcionesLineas(selector) {
  fetch(`http://localhost:3308/lineaConOrdenActiva`)
    .then((res) => res.json())
    .then((data) => mostrarOpciones(data))
    .catch((error) => console.log(error));

  const mostrarOpciones = (data) => {
    for (let categoria of data) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = categoria.nro_linea;
      selector.appendChild(nuevaOpcion);
    }
  };
}
function cargarInspeccion(){
  contadorPrimera()
  contadorDefecto("#tablaIzquierdoReproceso tbody","izquierdoReproceso") 
  contadorDefecto("#tablaDerechoReproceso tbody","derechoReproceso") 
  contadorDefecto("#tablaIzquierdoObservado tbody","izquierdoObservado")
  contadorDefecto("#tablaDerechoObservado tbody","derechoObservado")
}


function contadorDefecto(tbody , pie){
  contadorDefecto1(tbody, pie)
  contadorDefecto2(tbody, pie)
  contadorDefecto3(tbody, pie)
  contadorDefecto4(tbody, pie)
  contadorDefecto5(tbody, pie)
}

function contadorPrimera(){
  var primera =parseInt( $("#primera").val());
  if (primera === 0){
    $("#tablaParesPrimera tbody").on('click',"button.btnAgregarPrimera", function(){
      primera++;
      $("#primera").val(primera);
  });
  $("#tablaParesPrimera tbody").on('click',"button.btnEliminarPrimera", function(){
    if (primera>0){
    primera--;
    $("#primera").val(primera);
    }
  });
  }else{

    $("#primera").val(0); 
  }

}

function contadorDefecto1(tbody, pie){
  var defecto1 = parseInt( $("#"+pie+"Defecto1").val());
  if (defecto1 === 0){
    $(tbody).on('click',"button.btnSumarDefecto1", function(){
      defecto1++;
      $("#"+pie+"Defecto1").val(defecto1);
      var defecto =  $(this).parents("tr").find("td").eq(0).html();
      console.log(defecto);
});
$(tbody).on('click',"button.btnEniminarDefecto1", function(){
  if(defecto1 >0){
    defecto1--;
    $("#"+pie+"Defecto1").val(defecto1);
  }
})
  }else{
    $("#"+pie+"Defecto1").val(0);
  }
}
function contadorDefecto2(tbody, pie){
  var defecto2 =parseInt( $("#"+pie+"Defecto2").val());
  if (defecto2 === 0){
  $(tbody).on('click',"button.btnSumarDefecto2", function(){
    defecto2++;
    $("#"+pie+"Defecto2").val(defecto2);
  })
  $(tbody).on('click',"button.btnEniminarDefecto2", function(){
    if(defecto2 >0){
      defecto2--;
      $("#"+pie+"Defecto2").val(defecto2);
    }
  })
}else{
  $("#"+pie+"Defecto2").val(0);
}
}
function contadorDefecto3(tbody, pie){
  var defecto3 =parseInt( $("#"+pie+"Defecto3").val());
  if (defecto3 === 0){
  $(tbody).on('click',"button.btnSumarDefecto3", function(){
    defecto3++;
    $("#"+pie+"Defecto3").val(defecto3);
  })
  $(tbody).on('click',"button.btnEniminarDefecto3", function(){
    if(defecto3 >0){
      defecto3--;
      $("#"+pie+"Defecto3").val(defecto3);
    }
  })
}else{
  $("#"+pie+"Defecto3").val(0);
}
}
function contadorDefecto4(tbody, pie){
  var defecto4 =parseInt( $("#"+pie+"Defecto4").val());
  if (defecto4 === 0){
  $(tbody).on('click',"button.btnSumarDefecto4", function(){
    defecto4++;
    $("#"+pie+"Defecto4").val(defecto4);
  })
  $(tbody).on('click',"button.btnEniminarDefecto4", function(){
    if(defecto4 >0){
      defecto4--;
      $("#"+pie+"Defecto4").val(defecto4);
    }
  })
}else{
  $("#"+pie+"Defecto4").val(0);
}
}
function contadorDefecto5(tbody, pie){
  var defecto5 =parseInt( $("#"+pie+"Defecto5").val());
  if (defecto5 === 0){
  $(tbody).on('click',"button.btnSumarDefecto5", function(){
    defecto5++;
    $("#"+pie+"Defecto5").val(defecto5);
  })
  $(tbody).on('click',"button.btnEniminarDefecto5", function(){
    if(defecto5 >0){
      defecto5--;
      $("#"+pie+"Defecto5").val(defecto5);
    }
  })
}else{
  $("#"+pie+"Defecto5").val(0);
}
}