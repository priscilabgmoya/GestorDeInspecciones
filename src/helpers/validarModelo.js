module.exports.validarInformacionModelo = async function (modelo){
    if(!modelo.sku){
        return "SKU es requerido";
    }
    if(!modelo.denominacion){
        return "Denominacion es requerido";
    }
    if(!modelo.limite_superior_observado){
        return "Limite Superior Observado es requerido";
    }
    if(!modelo.limite_inferior_observado){
        return "Limite inferior Observado es requerido";
    }
    if(!modelo.limite_superior_reproceso){
        return "Limite Superior reproceso es requerido";
    }
    if(!modelo.limite_inferior_reproceso){
        return "Limite inferior reproceso es requerido";
    }
}