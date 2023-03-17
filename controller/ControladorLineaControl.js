var id_turno = parseInt( window.localStorage.getItem("idturnoIngreso"));
var dniUsuario = parseInt( window.localStorage.getItem("dniUsuario"));
const selectorHora = document.getElementById("grupoBtnIncidencia");
const date = new Date();
const en_proceso = 3;
const primera = 0;
const defecto =1;
const urlLocalHost = "http://localhost:3308/";
const urlDefectoObservado = `${urlLocalHost}obtenerTipoDefectoObservado`
const urlDefectoReproceso = `${urlLocalHost}obtenerTipoDefectoReproceso`
const bodyDerechoObservado = document.getElementById("tablaPieDerechoObservado");
const bodyIzquierdoObservado = document.getElementById("tablaPieIzquierdoObservado");
const bodyDerechoReproceso = document.getElementById("tablaPieDerechoReporceso");
const bodyIzquierdoReproceso = document.getElementById("tablaPieIzquierdoReproceso");
const selectorLinea = document.getElementById("listadoNroLinea");
let primeraEncontrados = new Array();
let defectoEncontrados = new Array();

opcionesLineas(selectorLinea);

fetch(`${urlLocalHost}buscarJornadaLaboral/${dniUsuario}`)
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
    cargarDatosEmpleados();
  }
}

function cargarDatosEmpleados() {
  fetch(`${urlLocalHost}supervisorCalidadAsociadoLinea/${dniUsuario}`)
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

    cargarDefectos(urlDefectoObservado, bodyDerechoObservado,"derechoObservado");
    cargarDefectos(urlDefectoObservado,bodyIzquierdoObservado,"izquierdoObservado");
    cargarDefectos(urlDefectoReproceso,bodyDerechoReproceso,"derechoReproceso");
    cargarDefectos(urlDefectoReproceso,bodyIzquierdoReproceso,"izquierdoReproceso");
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

    fetch(`${urlLocalHost}agregarJornada`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jornadaAsociada),
    }).catch((error) => console.log(error));
    window.location.reload();
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
  fetch(`${urlLocalHost}horarioTurno/${turno}`)
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
       let boton = document.createElement("input");
       boton.type = "radio";
       boton.name = "btnInspeccion";
       boton.value = ""+numHoraEntrada;
       boton.ondblclick = cargarInspeccion;
       let label = document.createElement("label");
       label.innerHTML = horaEntrada;
       label.className = "mx-4"
       label.style = "font-size: 20px; "
       selectorHora.appendChild(boton);
       selectorHora.appendChild(label);
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
  fetch(`${urlLocalHost}lineaConOrdenActiva`)
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
   contadorDefecto("#tablaPieIzquierdoReproceso","izquierdo","Reproceso") 
    contadorDefecto("#tablaDerechoReproceso tbody","derecho","Reproceso") 
    contadorDefecto("#tablaIzquierdoObservado tbody","izquierdo","Observado")
    contadorDefecto("#tablaDerechoObservado tbody","derecho","Observado")
}

function contadorDefecto(tbody , pie,tipo_defecto){
  contadorDefecto1(tbody, pie,tipo_defecto)
  contadorDefecto2(tbody, pie,tipo_defecto)
  contadorDefecto3(tbody, pie,tipo_defecto)
  contadorDefecto4(tbody, pie,tipo_defecto)
  contadorDefecto5(tbody, pie,tipo_defecto)
}

function contadorPrimera(){
  let primera=0;
  if (primera === 0){
    let horaClick = document.querySelector('input[name="btnInspeccion"]:checked').value;
  $("#tablaParesPrimera tbody").on('click',"button.btnAgregarPrimera", function(){
    primera++;
    $("#primera").val(primera);
    let  sumarIncidencia ={
      "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
      "cantidad": 1
    }
    incidenciaPrimera(sumarIncidencia)
  });
  $("#tablaParesPrimera tbody").on('click',"button.btnEliminarPrimera", function(){
    if (primera>0){
      primera--;
      $("#primera").val(primera);
      let  restarIncidencia ={
        "horaIncidencia":document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
        "cantidad": -1
      }
      incidenciaPrimera(restarIncidencia)
    }
  });

}
$("#primera").val(0);
}


function contadorDefecto1(tbody, pie,tipo_defecto){
  
  let horaClick = document.querySelector('input[name="btnInspeccion"]:checked').value;
  var defecto1 = parseInt( $("#"+pie+tipo_defecto+"Defecto1").val());
  if (defecto1 === 0){
    $(tbody).on('click',"button.btnSumarDefecto1", function(){
      defecto1++;
      $("#"+pie+tipo_defecto+"Defecto1").val(defecto1);
      let sumarDefecto = {
        "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
         "defecto": $(this).parents("tr").find("td").eq(0).html(),
         "cantidad": 1,
         "pie": pie
      }
      incidenciaDefecto(sumarDefecto);
});
$(tbody).on('click',"button.btnEniminarDefecto1", function(){
  if(defecto1 >0){
    defecto1--;
    $("#"+pie+tipo_defecto+"Defecto1").val(defecto1);
    let restarDefecto = {
      "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
       "defecto": $(this).parents("tr").find("td").eq(0).html(),
       "cantidad": -1,
       "pie": pie
    }
    incidenciaDefecto(restarDefecto);
  }
})
  }else{
      $("#"+pie+tipo_defecto+"Defecto1").val(0);
    }
  }

function contadorDefecto2(tbody, pie,tipo_defecto){

  let horaClick = document.querySelector('input[name="btnInspeccion"]:checked').value;
  var defecto2 =parseInt( $("#"+pie+tipo_defecto+"Defecto2").val());
  if (defecto2 === 0){
  $(tbody).on('click',"button.btnSumarDefecto2", function(){
    defecto2++;
    $("#"+pie+tipo_defecto+"Defecto2").val(defecto2);
    let sumarDefecto = {
      "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
       "defecto": $(this).parents("tr").find("td").eq(0).html(),
       "cantidad": 1,
       "pie": pie
    }
    incidenciaDefecto(sumarDefecto);
  })
  $(tbody).on('click',"button.btnEniminarDefecto2", function(){
    if(defecto2 >0){
      defecto2--;
      $("#"+pie+tipo_defecto+"Defecto2").val(defecto2);
      let restarDefecto = {
        "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
         "defecto": $(this).parents("tr").find("td").eq(0).html(),
         "cantidad": -1,
         "pie": pie
      }
      incidenciaDefecto(restarDefecto);
    }
  })
}else{
    $("#"+pie+tipo_defecto+"Defecto2").val(0);
  }
}

function contadorDefecto3(tbody, pie,tipo_defecto){

  let horaClick = document.querySelector('input[name="btnInspeccion"]:checked').value;
  var defecto3 =parseInt( $("#"+pie+tipo_defecto+"Defecto3").val());
  if (defecto3 === 0){
  $(tbody).on('click',"button.btnSumarDefecto3", function(){
    defecto3++;
    $("#"+pie+tipo_defecto+"Defecto3").val(defecto3);
    let sumarDefecto = {
      "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
       "defecto": $(this).parents("tr").find("td").eq(0).html(),
       "cantidad": 1,
       "pie": pie
    }
    incidenciaDefecto(sumarDefecto);
  })
  $(tbody).on('click',"button.btnEniminarDefecto3", function(){
    if(defecto3 >0){
      defecto3--;
      $("#"+pie+tipo_defecto+"Defecto3").val(defecto3);
      let restarDefecto = {
        "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
         "defecto": $(this).parents("tr").find("td").eq(0).html(),
         "cantidad": -1,
         "pie": pie
      }
      incidenciaDefecto(restarDefecto);
    }
  })
}else{
    $("#"+pie+tipo_defecto+"Defecto3").val(0);
  }
}


function contadorDefecto4(tbody, pie,tipo_defecto){

  let horaClick = document.querySelector('input[name="btnInspeccion"]:checked').value;
  var defecto4 =parseInt( $("#"+pie+tipo_defecto+"Defecto4").val());
  if (defecto4 === 0){
  $(tbody).on('click',"button.btnSumarDefecto4", function(){
    defecto4++;
    $("#"+pie+tipo_defecto+"Defecto4").val(defecto4);
    let sumarDefecto = {
      "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
       "defecto": $(this).parents("tr").find("td").eq(0).html(),
       "cantidad": 1,
       "pie": pie
    }
    incidenciaDefecto(sumarDefecto);
  })
  $(tbody).on('click',"button.btnEniminarDefecto4", function(){
    if(defecto4 >0){
      defecto4--;
      $("#"+pie+tipo_defecto+"Defecto4").val(defecto4);
      let restarDefecto = {
        "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
         "defecto": $(this).parents("tr").find("td").eq(0).html(),
         "cantidad": -1,
         "pie": pie
      }
      incidenciaDefecto(restarDefecto);
    }
  })


}else{
    $("#"+pie+tipo_defecto+"Defecto4").val(0);
  }
}


function contadorDefecto5(tbody, pie,tipo_defecto){

  let horaClick = document.querySelector('input[name="btnInspeccion"]:checked').value;
  var defecto5 =parseInt( $("#"+pie+tipo_defecto+"Defecto5").val());
  if (defecto5 === 0){
  $(tbody).on('click',"button.btnSumarDefecto5", function(){
    defecto5++;
    $("#"+pie+tipo_defecto+"Defecto5").val(defecto5);
    let sumarDefecto = {
      "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
       "defecto": $(this).parents("tr").find("td").eq(0).html(),
       "cantidad": 1,
       "pie": pie
    }
    incidenciaDefecto(sumarDefecto);
  })
  $(tbody).on('click',"button.btnEniminarDefecto5", function(){
    if(defecto5 >0){
      defecto5--;
      $("#"+pie+tipo_defecto+"Defecto5").val(defecto5);
      let restarDefecto = {
        "horaIncidencia": document.querySelector('input[name="btnInspeccion"]:checked').value +":00:00",
         "defecto": $(this).parents("tr").find("td").eq(0).html(),
         "cantidad": -1,
         "pie": pie
      }
      incidenciaDefecto(restarDefecto);
    }
  })
}else{
    $("#"+pie+tipo_defecto+"Defecto5").val(0);
  }
}


function incidenciaPrimera(incidenciaPrimera){
  let incidenciaPrimeras = {
    hora: incidenciaPrimera.horaIncidencia,
    fecha:   "" + date.getFullYear() + "-" + (date.getMonth() + 1) +"-" +date.getDate(),
    jornada:  parseInt( window.localStorage.getItem("jornada")),
    cantidad: incidenciaPrimera.cantidad,
    tipo_incidencia: "primera"
  }
  console.log(incidenciaPrimeras);
  primeraEncontrados.push(incidenciaPrimeras);
  console.log(primeraEncontrados);
  
  fetch(`${urlLocalHost}agregarIncidenciaPrimera`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(incidenciaPrimeras),
  }).catch((error) => console.log(error));
}

function incidenciaDefecto(incidenciaDefecto){
  let incidenciaDefectos = {
    hora: incidenciaDefecto.horaIncidencia,
    fecha:   "" + date.getFullYear() + "-" + (date.getMonth() + 1) +"-" +date.getDate(),
    defecto:incidenciaDefecto.defecto,
    jornada:  parseInt( window.localStorage.getItem("jornada")),
    cantidad: incidenciaDefecto.cantidad,
    tipo_incidencia:"defecto",
    tipoPie: incidenciaDefecto.pie
  }
  console.log(incidenciaDefectos);
  defectoEncontrados.push(incidenciaDefectos);
  console.log(defectoEncontrados);
  
  fetch(`${urlLocalHost}agregarIncidenciaDefecto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(incidenciaDefectos),
  }).catch((error) => console.log(error));
}