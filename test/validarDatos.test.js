/** modulos que usamos */
const test = require('test');
const assert = require('assert');

/**las clases necesarias para hacer correr los test */
const clases = require('../model/Class/Clases');
const estados = require('../model/Class/estado');

/** CLASES QUE UTLIZAMOS PARA HACER LOS TEST */
const fecha = new Date();
var modelo = new clases.Modelo(146,'nike',5,10,7,16);
var color = new clases.Color(1897,'blanco');
var Supervisorlinea = new clases.SupervisorLinea(45879,4879438741,'luis');
var linea = new clases.Linea(2);
var OrdenDeProduccion = new clases.OrdenDeProduccion(1243,fecha.toLocaleDateString(),fecha.toLocaleTimeString(),modelo,color,linea,Supervisorlinea);

/* TEST */
test('CREAR MODELO', async (t) => {
    await t.test('', (t)=>{
       assert.equal(146,modelo.sku);
       assert.equal('nike',modelo.denominacion);
       assert.equal(5,modelo.inf_rep);
       assert.equal(10,modelo.sup_rep);
       assert.equal(7,modelo.inf_obs);
       assert.equal(16,modelo.sup_obs);
    });
});

test('CREAR ORDEN DE PRODUCCION',async(t)=>{

    await t.test('',(t)=>{
        assert.notEqual(OrdenDeProduccion,null)
        assert.equal(estados.Estado.activada,OrdenDeProduccion.estado)
        assert.equal(OrdenDeProduccion.n_op,1243)

        assert.notEqual(OrdenDeProduccion.supervisor,null)
        assert.equal(OrdenDeProduccion.supervisor.getNombreSupervisor(),Supervisorlinea.getNombreSupervisor())
        assert.equal(OrdenDeProduccion.supervisor.getLegajoSupervisor(),Supervisorlinea.getLegajoSupervisor())

        assert.notEqual(OrdenDeProduccion.linea,null)
        assert.equal(OrdenDeProduccion.linea.nroLinea(),linea.nroLinea())
    });

});

test('HORA INCIDENCIA DE PRIMERA DENTRO DE UNA JORNADA',async(t)=>{
    
    await t.test('',(t)=>{
        assert.equal(OrdenDeProduccion.jornada.validarHora(fecha.getHours()),true)
       
    });

});

test('FINALIZAMOS UNA ORDEN DE PRODUCCION',async(t)=>{
    OrdenDeProduccion.finalizarOrdenProduccion()

    await t.test('',()=>{
        assert.equal(estados.Estado.finalizada,OrdenDeProduccion.estado)
    });

});

test('CREAR INCIDENCIA DE PRIMERA',async(t)=>{
  var IncidenciaOrdenProduccion = OrdenDeProduccion.jornada.agregarIncidenciaPrimera('derecho','primera',fecha.toLocaleDateString(),fecha.getHours())
  var IncidenciaPrueba = new clases.Incidencia('derecho','primera',fecha.toLocaleDateString(),fecha.getHours())
    await t.test('',(t)=>{
        assert.equal(IncidenciaOrdenProduccion.fecha,IncidenciaPrueba.fecha);
        assert.equal(IncidenciaOrdenProduccion.hora, IncidenciaPrueba.hora);
        assert.equal(IncidenciaOrdenProduccion.pie, IncidenciaPrueba.pie);
        assert.equal(IncidenciaOrdenProduccion.tipoDeIncidencia,IncidenciaPrueba.tipoDeIncidencia);
    });
});
