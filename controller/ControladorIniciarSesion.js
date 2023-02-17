const date = new Date();

$("#btnIniciarSesion").on("click", function () {
  iniciarSesion();
});
function iniciarSesion() {
  var dni = $("#usuarioInput").val();
  cargarTurnos();
  fetch(`http://localhost:3308/gestionarUsuario/buscarEmpleado/${dni}`)
    .then((res) => verificarRegistro(res.status))
    .catch((error) => console.log(error));

  const verificarRegistro = (estadoRespuesta) => {
    if (estadoRespuesta === 200) {
      fetch(`http://localhost:3308/usuarioRegistrado/${dni}`)
        .then((res) => res.json())
        .then((data) => validarContraseña(data[0]))
        .catch((error) => console.log(error));
    } else {
      alert("DNi no se encuentra registrado");
      $("#ventanaCrearUsuario").modal("show");
    }
  };
}
function validarContraseña(dato) {
  var contraseña = $("#passwordInput").val();
  if (contraseña === dato.contraseña) {
      crearJornadaLaboral(dato.dni , dato.tipo_empleado);
 
  } else {
    alert("Error: Contraseña No Valida");
  }
}

function crearJornadaLaboral(dniUsuario, tipoEmpleado) {
  fetch(`http://localhost:3308/buscarJornadaLaboral/${dniUsuario}`)
    .then((res) => verificarJornada(res.status))
    .catch((error) => console.log(error));
  const verificarJornada = (estadoDeRespuesta) => {
    if (estadoDeRespuesta === 200) {
      alert(
        "mostramo una ventana modal si desea seguir con la misma jornada o no "
      );
      redireccionPantallaDeTrabajo(tipoEmpleado);
    } else {
      let nuevaJornadaLaboral = {
        id_jornada_laboral: parseInt(generateID()),
        fecha_inicio:
          "" + date.getFullYear() + "-" + (date.getMonth() +1)+ "-" + date.getDate(),
        idturno: parseInt(window.localStorage.getItem("idturnoIngreso")),
        dni_empleado: parseInt(dniUsuario),
      };
      console.log(nuevaJornadaLaboral);
      fetch(`http://localhost:3308/jornadaLaboral/agregarJornada`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaJornadaLaboral),
      }).catch((error) => console.log(error));
      redireccionPantallaDeTrabajo(tipoEmpleado);
    }
  };
}

function cargarTurnos() {
  var horaIngreso = date.toLocaleTimeString();
  fetch(`http://localhost:3308/turnosDisponibles`)
    .then((res) => res.json())
    .then((data) => obtenerTurno(data))
    .catch((error) => console.log(error));

  const obtenerTurno = (dato) => {
    let turno, id_turno;
    dato.forEach((turnos) => {
      if (
        turnos.descripcion === "mañana" &&
        horaIngreso >= turnos.hora_entrada &&
        horaIngreso <= turnos.hora_salida
      ) {
        turno = turnos.descripcion;
        id_turno = turnos.id_turno;
      }
      if (
        turnos.descripcion === "tarde" &&
        horaIngreso >= turnos.hora_entrada &&
        horaIngreso <= turnos.hora_salida
      ) {
        turno = turnos.descripcion;
        id_turno = turnos.id_turno;
      }
    });
    window.localStorage.setItem("turnoIngreso", turno);
    window.localStorage.setItem("idturnoIngreso", id_turno);
  };
}

function redireccionPantallaDeTrabajo(tipoEmpleado) {
  /**
   * si es supervisor de linea
   */
  if (tipoEmpleado === "supervisor de linea") {
    window.location.href = "../view/OrdenProduccion.html";
    window.localStorage.setItem("dniUsuario", $("#usuarioInput").val());
  }
  /**
   * si es supervisor de calidad
   *
   */
  if (tipoEmpleado === "supervisor de calidad") {
    window.location.href = "../view/listadoOrdenProduccion.html";
  }
  /**
   * si es el administrador
   *
   */
  if (tipoEmpleado === "administrativo") {
    window.location.href = "../view/GestionarUsuario.html";
  }
}

$("#btnGuardarUsuarioModal").on("click", function () {
  CrearUsuario();
});
function CrearUsuario() {
  let dni = $("#inputDniModal").val(),
    nombre = $("#inputNombreModal").val(),
    apellido = $("#inputApellidoModal").val(),
    correo = $("#inputCorreoElectronicoModal").val();

  let nuevoUsuario = {
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    correo_electronico: correo,
    id_tipo_empleado: "",
    contraseña: generatePassword(),
    registro: activo,
  };

  fetch(`http://localhost:3308/gestionarUsuario/altaUsuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoUsuario),
  }).catch((error) => console.log(error));
  alert("Usuario Creado!!");
  location.reload();
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
function generateID() {
  var pass = "";
  var str = "0123456789";
  for (let i = 1; i <= 6; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  return pass;
}
