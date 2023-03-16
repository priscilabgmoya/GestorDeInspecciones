const $lucesDelCirculoObservado = document.querySelectorAll('.luces-circulo_observados');
let contadorDeLuz2 = 0;

const mostrarLuz2 = () =>{
    $lucesDelCirculoObservado[contadorDeLuz2].className = 'luces-circuloobservados';
    contadorDeLuz2++;

    if(contadorDeLuz2 > 2) contadorDeLuz2 = 0;

    const luzActual2 = $lucesDelCirculoObservado[contadorDeLuz2];
    luzActual2.classList.add(luzActual2.getAttribute('color'))
}
setInterval(mostrarLuz2,2000)