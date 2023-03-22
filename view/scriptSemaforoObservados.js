const $lucesDelCirculoObservado = document.querySelectorAll('.luces-circulo_observados');
let contadorDeLuz2 = 0;

const mostrarLuz2 = () =>{
    $lucesDelCirculoObservado[contadorDeLuz2].className = 'luces-circulo_observados';
    
    //if(contadorDeLuz2 > 2) contadorDeLuz2 = 0;
    const luzActual2 = $lucesDelCirculoObservado[0];
    luzActual2.classList.add(luzActual2.getAttribute('color'))
   
    
    const luzAmarilla = $lucesDelCirculoObservado[1];
    luzAmarilla.classList.add(luzAmarilla.getAttribute('color'))
    
    contadorDeLuz2= 4;
    const luzRoja = $lucesDelCirculoObservado[2];
    luzRoja.classList.add(luzRoja.getAttribute('color'))
}
setInterval(mostrarLuz2,2000)