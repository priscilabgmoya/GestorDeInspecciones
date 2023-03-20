/**
 * varaibles que se usan en el documento
 */
const bodyModelo = document.getElementById("bodyTablaModelo");
const urlLocalHost = "http://localhost:3308/";
/**
 * Listamos los modelos desde la DB
 */
fetch(`${urlLocalHost}gestionarModelo/listado`)
  .then((res) => res.json())
  .then((data) => mostrarModelo(data))
  .catch((error) => console.log(error));

const mostrarModelo = (data) => {
  data.forEach((modelo) => {
    let fila = document.createElement("tr");

    let columna = document.createElement("td");
    columna.innerText = modelo.sku;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = modelo.denominacion;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = modelo.limite_superior_observado;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = modelo.limite_inferior_observado;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = modelo.limite_superior_reproceso;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = modelo.limite_inferior_reproceso;
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
    $("#tablaModelo").DataTable();
  });
  modificarModelo("#tablaModelo tbody", "button.btnEditar");
  eliminarModelo("#tablaModelo tbody", "button.btnEliminar");
};
function crearBoton() {
  let boton = document.createElement("button");
  boton.type = "button";
  return boton;
}
/**
 * Modificamos un modelo Seleccionado
 */
function modificarModelo(tbody, boton) {
  $(tbody).on("click", boton, function () {
    let sku = $(this).parents("tr").find("td").eq(0).html(),
      denominacion = $(this).parents("tr").find("td").eq(1).html(),
      limSupObservado = $(this).parents("tr").find("td").eq(2).html(),
      limInfObservado = $(this).parents("tr").find("td").eq(3).html(),
      limSupReproceso = $(this).parents("tr").find("td").eq(4).html(),
      limInfReproceso = $(this).parents("tr").find("td").eq(5).html();

    $("#inputSku").val(sku);
    $("#inputDenominacion").val(denominacion);
    $("#inputLimiteSuperiorObservado").val(limSupObservado);
    $("#inputLimiteInferiorObservado").val(limInfObservado);
    $("#inputLimiteSuperiorReproceso").val(limSupReproceso);
    $("#inputLimiteInferiorReproceso").val(limInfReproceso);

    activarInputs();

    let modeloModificado = {
      sku: $("#inputSku").val(),
      denominacion: "",
      limite_superior_observado: 0,
      limite_inferior_observado: 0,
      limite_superior_reproceso: 0,
      limite_inferior_reproceso: 0,
    };

    $("#inputDenominacion").change(function () {
      modeloModificado.denominacion = $("#inputDenominacion").val();
    });
    $("#inputLimiteSuperiorObservado").change(function () {
      modeloModificado.limite_superior_observado = parseInt(
        $("#inputLimiteSuperiorObservado").val()
      );
    });
    $("#inputLimiteInferiorObservado").change(function () {
      modeloModificado.limite_inferior_observado = parseInt(
        $("#inputLimiteInferiorObservado").val()
      );
    });
    $("#inputLimiteSuperiorReproceso").change(function () {
      modeloModificado.limite_superior_reproceso = parseInt(
        $("#inputLimiteSuperiorReproceso").val()
      );
    });
    $("#inputLimiteInferiorReproceso").change(function () {
      modeloModificado.limite_inferior_reproceso = parseInt(
        $("#inputLimiteInferiorReproceso").val()
      );
    });

    if (modeloModificado.denominacion === "") {
      modeloModificado.denominacion = $("#inputDenominacion").val();
    }
    if (modeloModificado.limite_superior_observado === 0) {
      modeloModificado.limite_superior_observado = parseInt(
        $("#inputLimiteSuperiorObservado").val()
      );
    }
    if (modeloModificado.limite_inferior_observado === 0) {
      modeloModificado.limite_inferior_observado = parseInt(
        $("#inputLimiteInferiorObservado").val()
      );
    }
    if (modeloModificado.limite_superior_reproceso === 0) {
      modeloModificado.limite_superior_reproceso = parseInt(
        $("#inputLimiteSuperiorReproceso").val()
      );
    }
    if (modeloModificado.limite_inferior_reproceso === 0) {
      modeloModificado.limite_inferior_reproceso = parseInt(
        $("#inputLimiteInferiorReproceso").val()
      );
    }

    $("#btnGuardarModificacion").on("click", function () {
      fetch(`${urlLocalHost}gestionarModelo/modificarModelo`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modeloModificado),
      }).catch((error) => console.log(error));
      alert("Modelo Modificado!!!");
    });
  });
}
/**
 * Eliminamos un modelo Seleccionado
 */
function eliminarModelo(tbody, boton) {
  $(tbody).on("click", boton, function () {
    let sku = parseInt($(this).parents("tr").find("td").eq(0).html());
   
    $("#ventanaEliminarModeloModal").modal("show");
    let modeloEliminado = {
      sku: sku
    };
    $("#btnEliminarModeloModal").on("click", function () {
      fetch(`${urlLocalHost}gestionarModelo/eliminarModelo`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modeloEliminado),
      }).catch((error) => console.log(error));
      alert("Modelo Eliminado!!");
      location.reload();
    });
  });
}
/**
 * Creamos un Nuevo Modelo
 */
function CrearModelo() {
   let sku = $("#inputSkuModal").val(),

    denominacion = $("#inputDenominacionModal").val(),
    limiteSupObservado = parseInt(
      $("#inputLimiteSuperiorObservadoModal").val()
    ),
    limiteInfObservado = parseInt(
      $("#inputLimiteInferiorObservadoModal").val()
    ),
    limiteSupReproceso = parseInt(
      $("#inputLimiteSuperiorReprocesoModal").val()
    ),
    limiteInfReproceso = parseInt(
      $("#inputLimiteInferiorReprocesoModal").val()
    );
/**objeto que agrego  */
  let nuevoModelo = {
    sku: sku,
    denominacion: denominacion,
    limite_superior_observado: limiteSupObservado,
    limite_inferior_observado: limiteInfObservado,
    limite_superior_reproceso: limiteSupReproceso,
    limite_inferior_reproceso: limiteInfReproceso,
  };

fetch(`${urlLocalHost}gestionarModelo/altaModelo`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(nuevoModelo),
}).then(res => estadoOrden(res.status))
.catch((error) => console.log(error));
const estadoOrden =  (estado)=>{
if(estado === 201){
alert('Modelo Creado');
}
if(estado === 409){
alert('Modelo  Ya existente');
}
if(estado === 400){
alert('Error: falta informacion de SKU  y/o denominacion y/o limite superior Observado y/o limite inferior Observado y/o limite superior Reproceso y/o limite inferior Reproceso');
}
if(estado === 500){
alert('Error: no se creo el Usuario');
}
}
}

$("#btnGuardarModal").on("click", function () {
  CrearModelo();
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
  $("#inputDenominacion").prop("disabled", false);
  $("#inputLimiteSuperiorObservado").prop("disabled", false);
  $("#inputLimiteInferiorObservado").prop("disabled", false);
  $("#inputLimiteSuperiorReproceso").prop("disabled", false);
  $("#inputLimiteInferiorReproceso").prop("disabled", false);

  $("button.btnEditar").prop("disabled", true);
  $("button.btnEliminar").prop("disabled", true);
}
