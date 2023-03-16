const $lucesDelCirculoReproceso = document.querySelectorAll('.luces-circulo_reproceso'); //recorre y devuelve un elemento y el $ indica un objeto jquery
let contadorDeLuz = 0;

const mostrarLuz = () =>{
    $lucesDelCirculoReproceso[contadorDeLuz].className = 'luces-circulo_reproceso';
    contadorDeLuz++;

    if(contadorDeLuz > 2) contadorDeLuz = 0;

    const luzActual = $lucesDelCirculoReproceso[contadorDeLuz];
    luzActual.classList.add(luzActual.getAttribute('color'))
}
setInterval(mostrarLuz,2000)
