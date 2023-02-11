const activo = 1;
const disponibilidad = 'disponible';

const selectorLinea = document.getElementById("nroLinea");
const selectorModelo = document.getElementById("tipoModelo");
const selectorColor = document.getElementById("tipoColor");

const urlModelo =`http://localhost:3308/gestionarModelo/denominacion/${activo}`;
const urlColor = `http://localhost:3308/gestionarColor/descripcion/${activo}`;

const date  = new Date();

var dniUsuario = localStorage.getItem("dniUsuario");


opcionesLineas(selectorLinea);
opcionesSelector(urlModelo,selectorModelo);
opcionesSelector(urlColor,selectorColor);

console.log(dniUsuario);
fetch( `http://localhost:3308/turnosDisponibles`)
.then((res) => res.json())
.then((data) => console.log(data))
.catch((error) => console.log(error));

function opcionesSelector(url,selector) {
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
    fetch( `http://localhost:3308/numerosDeLineas/${disponibilidad}`)
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