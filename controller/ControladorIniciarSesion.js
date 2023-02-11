
$("#btnIniciarSesion").on('click', function(){
  iniciarSesion ();
})
function iniciarSesion (){
  var dni = $("#usuarioInput").val();

fetch(`http://localhost:3308/gestionarUsuario/buscarEmpleado/${dni}`)
.then((res) =>verificarRegistro(res.status))
.catch((error) => console.log(error));

const verificarRegistro = (estadoRespuesta)=>{
  if(estadoRespuesta === 200){
    fetch(`http://localhost:3308/usuarioRegistrado/${dni}`)
    .then((res) =>res.json())
    .then(data => validarContraseña(data[0]))
    .catch((error) => console.log(error));
  }else{
    alert("DNi no se encuentra registrado");
  }
}
}
 function validarContraseña (dato){
  var contraseña = $("#passwordInput").val();
  if(contraseña === dato.contraseña){
    crearJornadaLaboral();
    redireccionPantallaDeTrabajo(dato.tipo_empleado);
  }else{
    alert("Error: Contraseña No Valida");
  }
 }
 function crearJornadaLaboral(){

 }
function redireccionPantallaDeTrabajo(tipoEmpleado) {
  /**
   * si es supervisor de linea 
   */
  if(tipoEmpleado === 'supervisor de linea'){
    window.location.href = "../view/OrdenProduccion.html";
  }
    /**
     * si es supervisor de calidad 
     * 
     */
    if(tipoEmpleado === 'supervisor de calidad'){
    window.location.href = "../view/listadoOrdenProduccion.html";
    }
    /**
     * si es el administrador  
     *
     */
    if(tipoEmpleado === 'administrativo'){
    window.location.href = "../view/GestionarUsuario.html";
    }
}
