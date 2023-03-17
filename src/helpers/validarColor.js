module.exports.validarInformacionColor=async function(color){
 
if(!color.id_color){   
    return "ID de color requerido";
}

if(!color.descripcion){
    return "Descripcion requerida";
}
}

