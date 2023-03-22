const $lucesDelCirculoObservado = document.querySelectorAll('.luces-circulo_observados');
const $lucesDelCirculoReproceso = document.querySelectorAll('.luces-circulo_reproceso'); 
let contadorDeLuz2 = 0;
let contadorDeLuz = 0;

const mostrarLuz2 = () =>{
    $lucesDelCirculoObservado[contadorDeLuz2].className = 'luces-circulo_observados';
    contadorDeLuz2++;

    if(contadorDeLuz2 > 2) contadorDeLuz2 = 0;

    const luzActual2 = $lucesDelCirculoObservado[contadorDeLuz2];
    luzActual2.classList.add(luzActual2.getAttribute('color'))
}
setInterval(mostrarLuz2,2000)

const mostrarLuz = () =>{
    $lucesDelCirculoReproceso[contadorDeLuz].className = 'luces-circulo_reproceso';
    contadorDeLuz++;

    if(contadorDeLuz > 2) contadorDeLuz = 0;

    const luzActual = $lucesDelCirculoReproceso[contadorDeLuz];
    luzActual.classList.add(luzActual.getAttribute('color'))
}
setInterval(mostrarLuz,2000)
