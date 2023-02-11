const bodyUsuario = document.getElementById("bodyTablaUsuario");
const activo = 1;
const inactivo = 0;
const tipo_Empleado = document.getElementById("seleccionTipoEmpleado");
const tipo_Empleado_modal = document.getElementById(
  "seleccionTipoEmpleadoModal"
);
fetch(`http://localhost:3308/gestionarUsuario/${activo}`)
  .then((res) => res.json())
  .then((data) => mostrarUsuario(data))
  .catch((error) => console.log(error));

TipoEmpleado(tipo_Empleado_modal);
$().on('click',function(){

})
$("#btnGuardarUsuarioModal").on("click", function () {
  CrearUsuario();
});
function mostrarUsuario(data) {
  data.forEach((usuario) => {
    let fila = document.createElement("tr");

    let columna = document.createElement("td");
    columna.innerText = usuario.dni;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = usuario.nombre;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = usuario.apellido;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = usuario.correo_electronico;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = usuario.tipo_empleado;
    fila.appendChild(columna);

    columna = document.createElement("td");
    let btnEditar = crearBoton();
    btnEditar.className = "btnEditar btn btn-outline-warning float-right";
    btnEditar.innerText = "Modificar";
    columna.appendChild(btnEditar);
    fila.appendChild(columna);

    columna = document.createElement("td");
    let btnEliminar = crearBoton();
    btnEliminar.className = "btnEliminar btn btn-outline-danger";
    btnEliminar.innerText = "Eliminar";
    columna.appendChild(btnEliminar);
    fila.appendChild(columna);

    bodyUsuario.appendChild(fila);
  });
  $(document).ready(function () {
    $("#tablaUsuario").DataTable();
  });
  modificarUsuario("#tablaUsuario tbody", "button.btnEditar");
  eliminarUsuario("#tablaUsuario tbody", "button.btnEliminar");
}
function crearBoton() {
  let boton = document.createElement("button");
  boton.type = "button";
  return boton;
}
function TipoEmpleado(selector) {
  fetch("http://localhost:3308/usuario/tipoEmpleado")
    .then((res) => res.json())
    .then((data) => mostrarTipoEmpleado(data))
    .catch((error) => console.log(error));

  const mostrarTipoEmpleado = (data) => {
    for (let categoria of data) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = categoria.descripcion;
      selector.appendChild(nuevaOpcion);
    }
  };
}
function CrearUsuario() {
  let dni =$("#inputDniModal").val(),
    nombre = $("#inputNombreModal").val(),
    apellido = $("#inputApellidoModal").val(),
    correo = $("#inputCorreoElectronicoModal").val(),
    tipoEmpleado = $("#seleccionTipoEmpleadoModal option:selected").text();

  let nuevoUsuario = {
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    correo_electronico: correo,
    id_tipo_empleado: tipoEmpleado,
    contraseña: generatePassword(),
    registro: activo,
  };

  fetch(`http://localhost:3308/gestionarUsuario/buscarEmpleado/${dni}`)
    .then((res) => verificarDNi(res.status))
    .catch((error) => console.log(error));
  const verificarDNi = (estadoRespuesta) => {
    if (estadoRespuesta === 200) {
      alert("Error: Ya existe Usuario.");
      location.reload();
    } else {
      fetch(`http://localhost:3308/gestionarUsuario/altaUsuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      }).catch((error) => console.log(error));
      alert("Usuario Creado!!");
      location.reload();
    }
  };
}
function eliminarUsuario(tbody, boton) {
  $(tbody).on("click", boton, function () {
    let dni = parseInt($(this).parents("tr").find("td").eq(0).html());
    $("#ventanaEliminarUsuarioModal").modal("show");
    let usuarioEliminado = {
      dni: dni,
      registro: inactivo,
    };
    $("#btnEliminarUsuarioModal").on("click", function () {
      fetch(`http://localhost:3308/gestionarUsuario/bajaLogicaUsuario`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEliminado),
      }).catch((error) => console.log(error));
      alert("Usuario Eliminado!!");
      location.reload();
    });
  });
}
function modificarUsuario(tbody, boton) {
  $(tbody).on("click", boton, function () {
    let dni = $(this).parents("tr").find("td").eq(0).html(),
      nombre = $(this).parents("tr").find("td").eq(1).html(),
      apellido = $(this).parents("tr").find("td").eq(2).html(),
      correoElectronico = $(this).parents("tr").find("td").eq(3).html(),
      tipoEmpleado = $(this).parents("tr").find("td").eq(4).html();

    $("#inputDni").val(dni);
    $("#inputNombre").val(nombre);
    $("#inputApellido").val(apellido);
    $("#inputCorreoElectronico").val(correoElectronico);

    fetch("http://localhost:3308/usuario/tipoEmpleado")
      .then((res) => res.json())
      .then((data) => mostrarTipoEmpleado(data))
      .catch((error) => console.log(error));

    const mostrarTipoEmpleado = (data) => {
      for (let categoria of data) {
        if (categoria.descripcion === tipoEmpleado) {
          let nuevaOpcion = document.createElement("option");
          nuevaOpcion.text = tipoEmpleado;
          nuevaOpcion.selected = true;
          tipo_Empleado.appendChild(nuevaOpcion);
        } else {
          let nuevaOpcion = document.createElement("option");
          nuevaOpcion.text = categoria.descripcion;
          tipo_Empleado.appendChild(nuevaOpcion);
        }
      }
    };
    activarInputs();

    let usuarioModificado = {
      dni: $("#inputDni").val(),
      nombre: "",
      apellido: "",
      correo_electronico: "",
      id_tipo_empleado: "",
    };
   $("#inputNombre").change(function (){
    usuarioModificado.nombre = $("#inputNombre").val();
   });
   $("#inputApellido").change(function (){
    usuarioModificado.apellido = $("#inputApellido").val();
   });
   $("#inputCorreoElectronico").change(function (){
    usuarioModificado.correo_electronico = $("#inputCorreoElectronico").val();
   });
   $("#seleccionTipoEmpleado").change( function(){
    usuarioModificado.id_tipo_empleado = $("#seleccionTipoEmpleado option:selected").text();
   });

   if (usuarioModificado.nombre === ""){
    usuarioModificado.nombre = $("#inputNombre").val();
   }
   if (usuarioModificado.apellido === ""){
    usuarioModificado.apellido = $("#inputApellido").val();
   }
   if (usuarioModificado.correo_electronico === ""){
    usuarioModificado.correo_electronico = $("#inputCorreoElectronico").val();
   }
   if (usuarioModificado.id_tipo_empleado === ""){
    usuarioModificado.id_tipo_empleado = tipoEmpleado;
   }
   $("#btnGuardarModificacionUsuario").on('click', function(){
   fetch(`http://localhost:3308/gestionarUsuario/modificarUsuario`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioModificado),
    }).catch((error) => console.log(error));
    alert("Modelo Modificado!!!");
    location.reload();
   });
  });
}
$("#btnCancelarOperacion").on("click", function () {
  location.reload();
});
$("#btnCerrarModal").on("click", function () {
  location.reload();
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------- */
function activarInputs() {
  $("#inputNombre").prop("disabled", false);
  $("#inputApellido").prop("disabled", false);
  $("#inputCorreoElectronico").prop("disabled", false);
  $("#seleccionTipoEmpleado").prop("disabled", false);

  $("button.btnEditar").prop("disabled", true);
  $("button.btnEliminar").prop("disabled", true);
}

function generatePassword() {
  var pass = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  return pass;
}

/**
 * ver como enviar el correo con la contraseña ,api gmail
 */
/*function sendEmail() {
  var contrasena = generatePassword();
  Email.send({
    Host: "smtp.gmail.com",
    Username: "pribelen.bgm@gmail.com",
    Password: "Hogar2022",
    To: 'gpriscilab@gmail.com',
    From: "pribelenbgm@gmail.com",
    Subject: "Contraseña Gestor de Inspeccion",
    Body: `Hola! su contraseña es ${contrasena} .Para cambiar su Contraseña acceda al siguiente link ${"https://www.netflix.com/browse" }`,
  })
    .then(function () {
      alert("Email enviado")
    });
}*/
