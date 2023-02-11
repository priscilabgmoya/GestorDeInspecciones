/**
 * varaibles que se usan en el documento
 */
const bodyModelo = document.getElementById("bodyTablaColor");
const activo = 1;
const inactivo = 0;

/**
 * Listamos los modelos desde la DB
 */
fetch(`http://localhost:3308/gestionarColor/${activo}`)
  .then((res) => res.json())
  .then((data) => mostrarColor(data))
  .catch((error) => console.log(error));

const mostrarColor = (data) => {
  data.forEach((color) => {
    let fila = document.createElement("tr");

    let columna = document.createElement("td");
    columna.innerText = color.id_color;
    fila.appendChild(columna);


    columna = document.createElement("td");
    columna.innerText = color.descripcion;
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

    bodyModelo.appendChild(fila);
  });
  $(document).ready(function () {
    $("#tablaColor").DataTable();
  });
  modificarColor("#tablaColor tbody", "button.btnEditar");
  eliminarColor("#tablaColor tbody", "button.btnEliminar");
};
function crearBoton() {
  let boton = document.createElement("button");
  boton.type = "button";
  return boton;
}
/**
 * Funcion que elimina un color
 */
function eliminarColor(tbody, boton) {
  $(tbody).on("click", boton, function () {
    let idColor = parseInt($(this).parents("tr").find("td").eq(0).html());

    $("#ventanaEliminarColorModal").modal("show");
    let colorEliminado = {
      id_color: idColor,
      registro: inactivo,
    };
    $("#btnEliminarColorModal").on("click", function () {
      fetch(`http://localhost:3308/gestionarColor/bajaLogicaColor`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(colorEliminado),
      }).catch((error) => console.log(error));
      alert("Color Eliminado!!");
      location.reload();
    });
  });
}
/**
 * Funcion que modifica un color
 */
function modificarColor(tbody, boton) {
  $(tbody).on("click", boton, function () {
    let idColor = $(this).parents("tr").find("td").eq(0).html(),
      descripcion = $(this).parents("tr").find("td").eq(1).html();

    $("#inputId").val(idColor);
    $("#inputDescripcion").val(descripcion);

    activarInputs();

    let colorModificado = {
      id_color: $("#inputId").val(),
      descripcion: "",
    };
    $("#inputDescripcion").change(function () {
      colorModificado.descripcion = $("#inputDescripcion").val();
    });
    if (colorModificado.descripcion === "") {
      colorModificado.descripcion = $("#inputDescripcion").val();
    }
    $("#btnGuardarColorModal").on("click", function () {
      fetch(`http://localhost:3308/gestionarColor/modificarColor`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(colorModificado),
      }).catch((error) => console.log(error));
      alert("Color Modificado!!!");
      location.reload();
    });
  });
}
/**
 * Creamos un Nuevo Color
 */
function CrearColor() {
  let idColor = parseInt($("#inputIdModal").val()),
    descripcionColor = $("#inputDenominaciónModal").val();

  let nuevoColor = {
    id_color: idColor,
    descripcion: descripcionColor,
    registro: activo,
  };
  console.log(nuevoColor);

  fetch(`http://localhost:3308/gestionarColor/buscarColor/${idColor}`)
    .then((res) => verificarID(res.status))
    .catch((error) => console.log(error));

  const verificarID = (estadoRespuesta) => {
    if (estadoRespuesta === 200) {
      alert("Error: Ya existe Color.");
      location.reload();
    } else {
      fetch(`http://localhost:3308/gestionarColor/altaColor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoColor),
      }).catch((error) => console.log(error));
      alert("Color Creado!!");
      location.reload();
    }
  };
}
$("#btnGuardarColorModal").on("click", function () {
  CrearColor();
});
/**
 * Boton desahacer operacion
 */
$("#btnCancelarOperacion").on("click", function () {
  location.reload();
});
$("#btnCerrarModal").on("click", function () {
  location.reload();
});
/*---------------------------------------------------------------------------------------------------------------------------------------------------- */
function activarInputs() {
  $("#inputDescripcion").prop("disabled", false);

  $("button.btnEditar").prop("disabled", true);
  $("button.btnEliminar").prop("disabled", true);
}
