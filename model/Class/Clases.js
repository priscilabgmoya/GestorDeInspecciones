var estados = require('./estado');
var  arrayIncidenciaPrimera = [];
var  arrayIncidenciaDefecto = [];
class Color{
  
    constructor(codigo,descripcion){
        this.codigo = codigo
        this.descripcion = descripcion
    }
    
}
// agregar mensajes de los casos de uso en el codigo
class JornadaLaboral{

    constructor(fechaInicio, horaInicio,horafin,fechaFin,incidencia){
        this.fechaInicio = fechaInicio
        this.turno = this.agregarTurno(horaInicio,horafin)
        this.fechaFin = fechaFin
    }
    agregarTurno(HoraInicio,Horafin){
        return new Turno(HoraInicio,Horafin)
    }
    validarHora(hora){
        if(hora > this.turno.getHoraInicio() && hora < this.turno.getHoraFIn()) return true;
        else return false; 
    }
    // anda 
    // agregar cantidad de incidencia de primera y de reproceso 
    /**
     * agregamos una incidencia de primera 
     * como el constructor de incidencia tiene agregado el defecto
     * se elemina en incidencia de primera el defecto
     */
    agregarIncidenciaPrimera(pie, tipoDeIncidencia,fecha,hora){
        if(this.validarHora(hora)){
            this.incidencia = new Incidencia(pie,tipoDeIncidencia,fecha,hora)
            arrayIncidenciaPrimera.push(this.incidencia)
            return this.incidencia
        }else return null    
    }
    //anda 
    // ver de hacer un repositorio para guardar 
    // hacer un metodo para controlar la hora de la incidencia 
    agregarIncidenciaDefecto(pie,tipoDeIncidencia,fecha,hora,descripcion,tipoDeDefecto){
        if(this.validarHora(hora)){
        var defecto = new Defecto(descripcion,tipoDeDefecto)
        this.incidencia = new Incidencia(pie,tipoDeIncidencia,fecha,hora,defecto)
        arrayIncidenciaDefecto.push(this.incidencia)
        return this.incidencia
        }else return null  
    }
    //anda
    tipoDePrimera(){
        var contadorPrimera = 0;
        arrayIncidenciaPrimera.forEach(elem => {
            console.log(elem.tipoDeIncidencia)
            if (elem.tipoDeIncidencia == estados.TipoIncidencia.primera.name){
                contadorPrimera = contadorPrimera + 1;
               }
               
          })
           return contadorPrimera;
    }
    verarrays(){
        console.log(arrayIncidenciaPrimera)
        console.log(arrayIncidenciaDefecto)
    }
    //anda
    tipoDeSegundaObservado(){
        var contadorObservado = 0;
        arrayIncidenciaDefecto.forEach(elem => {
            console.log(elem.defecto.getTipoDeDefecto())
            if (elem.tipoDeIncidencia == estados.TipoIncidencia.defecto.name && elem.defecto.getTipoDeDefecto() == estados.TipoDeDefecto.observado.name){
                contadorObservado =+ 1;
            }
        })
        return contadorObservado;
    }
    //anda
    tipoDeSegundaReproceso(){
        var contadorReproceso = 0;
     arrayIncidenciaDefecto.forEach(elem => {
        if (elem.tipoDeIncidencia == estados.TipoIncidencia.defecto.name && elem.defecto.getTipoDeDefecto() == estados.TipoDeDefecto.reproceso.name){
            contadorReproceso =+ 1;
        }
     })
        return contadorReproceso;
    }
}

class Linea{
    constructor(numero){
        this.numero = numero
    }
    nroLinea(){
        return this.numero
    }
}

class OrdenDeProduccion{
   
    constructor(n_op,fechaInicio,hora,modelo,color,linea,supervisor, jornada){
        this.n_op = n_op
        this.fechaInicio = fechaInicio
        this.hora = hora
        this.modelo = modelo
        this.color = color
        this.estado = estados.Estado.activada
        this.linea = linea
        this.supervisor = supervisor
        this.jornada = this.crearJornada(fechaInicio)

    }
    /**cuando se asocia un sup de calidad a la inspeccion de una orden de produccion */
    crearJornada(fecha_inicio){
        const fecha = new Date();
        return new JornadaLaboral(fecha_inicio,(fecha.getHours()-2),(fecha.getHours()+4))
    }
    
    finalizarOrdenProduccion(){
        this.estado = estados.Estado.finalizada
    }
    nro_linea_ordenProduccion(){
        
    }
}
class Incidencia{
    constructor(pie, tipoDeIncidencia,fecha,hora,defecto){
        
        this.pie = pie;
        this.tipoDeIncidencia = tipoDeIncidencia;
        this.fecha = fecha;
        this.hora = hora;
        this.defecto = defecto;
    }
}

class Defecto {

  constructor(descripcion,tipoDeDefecto){
    this.descripcion = descripcion;
    this.tipoDeDefecto = tipoDeDefecto; 
   }
   getDescripcion(){
    return this.descripcion
   }
   getTipoDeDefecto(){
    return this.tipoDeDefecto
   }
  
}
class Persona{
   
    constructor(nombre, apellido){
        this.nombre = nombre
        this.apellido= apellido
    }
}

class Semaforo{
  
    constructor(fechalimite, fechareinicio){
        this.fechalimite = fechalimite
        this.fechareinicio = fechareinicio
    }
}


class SupervisorLinea{

    constructor(legajo,dni,nombre){
        this.legajo = legajo
        this.dni = dni
        this.nombre = nombre
    }
    getNombreSupervisor(){
        return this.nombre;
    }
    getLegajoSupervisor(){
        return this.legajo
    }
}

class Turno{
   
    constructor(horaInicio, horaFin){
        this.horaInicio = horaInicio
        this.horaFin = horaFin
    }
    getHoraInicio(){
        return this.horaInicio
    }
    getHoraFIn(){
        return this.horaFin
    }
}

class Modelo{
    constructor(sku,denominacion,inf_rep,sup_rep,inf_obs,sup_obs){
        this.sku = sku
        this.denominacion = denominacion
        this.inf_rep = inf_rep
        this.sup_rep = sup_rep
        this.inf_obs = inf_obs
        this.sup_obs = sup_obs
    }   
    getSku(){
        return this.sku
    }
    getDenominacion(){
        return  this.denominacion
    }
    getLimSuperiorObervado(){
        return  this.sup_obs
    }
    getLimInferiorObervado(){
        return  this.inf_obs
    }
    getLimSuperiorReproceso(){
        return this.sup_rep
    }
    getLimInferiorReproceso(){
        return  this.inf_rep
    }
    
}

module.exports.Color = Color;
module.exports.Modelo = Modelo;
module.exports.OrdenDeProduccion = OrdenDeProduccion;
module.exports.SupervisorLinea = SupervisorLinea;
module.exports.Semaforo = Semaforo;
module.exports.Turno = Turno;
module.exports.Linea = Linea;
module.exports.JornadaLaboral = JornadaLaboral;
module.exports.Incidencia = Incidencia; 
module.exports.Defecto = Defecto;