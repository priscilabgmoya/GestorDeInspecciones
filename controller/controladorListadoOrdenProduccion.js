const en_proceso = 3;
const pausada = 1; 
const finalizada = 2; 
const bodyOrdenProduccion = document.getElementById("bodyTablaOrdenProduccion");



fetch(`http://localhost:3308/ordenDeProduccion/listadoOrdenCreada`)
  .then((res) => res.json())
  .then((data) => mostrarOrden(data))
  .catch((error) => console.log(error));

const mostrarOrden = (data) => {
  data.forEach((orden) => {
    let fila = document.createElement("tr");

    let columna = document.createElement("td");
    columna.innerText = orden.nro_produccion;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = orden.fecha;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = orden.color;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = orden.modelo;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = orden.nro_linea;
    fila.appendChild(columna);

    columna = document.createElement("td");
    columna.innerText = orden.estado;
    fila.appendChild(columna);

    columna = document.createElement("td");
    var erInput = document.createElement("input");
    erInput.setAttribute("type", "checkbox");
    erInput.setAttribute("class", "seleccionOrdenProducccion");
    columna.appendChild(erInput);
    fila.appendChild(columna);

    bodyOrdenProduccion.appendChild(fila);
  });
  $(document).ready(function () {
    $("#tablaOrdenProduccion").DataTable();
});
};
$('#btnPausarOrdenProduccion').on('click', function(){
    if( $('.seleccionOrdenProducccion').prop('checked') ) {
        obtenerNroOrdenProduccion("#tablaOrdenProduccion" ,pausada)
    }
});
$('#btnContinuarOrdenProduccion').on('click', function(){
  if( $('.seleccionOrdenProducccion').prop('checked') ) {
      obtenerNroOrdenProduccion("#tablaOrdenProduccion" ,en_proceso)
  }
});
function obtenerNroOrdenProduccion(table,estado){
    $(`${table} tr td input[type='checkbox']:checked`).each(function () {
        row = $(this).closest('tr');
           var  nro_orden = parseInt(row.find('td:eq(0)').text());
           var cambiarEstado = {
                 nroOrden: nro_orden,
                 estado: estado
           }
           fetch(`http://localhost:3308/cambiarEstadoOrdenProduccion`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cambiarEstado),
          }).catch((error) => console.log(error));

        });
        location.reload();
 }



