let InformacionCargada ={
    'modelo': [
        {
            SKU: 145, 
            descripcion: 'adidas',            
            lim_sup_observado: 10, 
            lim_inf_observado: 5, 
            lim_sup_reproceso: 15, 
            lim_inf_reproceso: 5 
        },
        {
            SKU: 146, 
            descripcion: 'nike',            
            lim_sup_observado: 16, 
            lim_inf_observado: 7, 
            lim_sup_reproceso: 10, 
            lim_inf_reproceso: 5 
        },
        {
            SKU: 147, 
            descripcion: 'puma',
            lim_sup_observado:15 , 
            lim_inf_observado: 10, 
            lim_sup_reproceso: 7, 
            lim_inf_reproceso: 5 
        }
    ],
    'color' :[
        {id: 154, descripcion: 'rojo'},
        {id: 254, descripcion: 'blanco'},
        {id: 360, descripcion: 'negro'}
    ],
    'nro_op': [
        {nro: 'ABC123', estado: 'disponible'},
        {nro: 'ABC124', estado: 'no disponible'},
        {nro: 'ABC125', estado: 'disponible'}
    ],
    'fecha-hora': [
        {fecha: '31/10/2022', hora: '21:00'},
        {fecha: '28/10/2022', hora: '10:00'},
        {fecha: '27/10/2022', hora: '11:00'}
    ],

    'nro_Linea':[
        {nro: 1, estado: 'ocupado'},
        {nro: 2, estado: 'libre'},
        {nro: 3, estado: 'ocupado'},
        {nro: 4, estado: 'ocupado'}
    ],
    'supervisor':[
        {nro: 'ABC126', supervisor: 'hugo'},
        {nro: 'ABC127', supervisor: 'alejandro'},
        {nro: 'ABC128', supervisor: 'pablo'}
    ],
    'OrdenDeProduccion':[
        {
            nro: 'ABC129' ,
            modelo: 'nike' ,
            color: 'blanco',
            nro_linea: 1
        },
        {
            nro: 'ABC130' ,
            modelo: 'puma' ,
            color: 'negro',
            nro_linea: 3
        },
        {
            nro: 'ABC131' ,
            modelo: 'adidas' ,
            color: 'rojo',
            nro_linea: 4
        }
    ],
    'cantidadDeDefecto':[
        {
            nro: 'ABC132',
            cantidad_observado: 8, 
            cantidad_reproceso: 7 
        },
        {
            nro: 'ABC133',
            cantidad_observado: 11, 
            cantidad_reproceso: 6 
        },
        {
            nro: 'ABC134',
            cantidad_observado: 8,
            cantidad_reproceso: 6 
        }
    ],
    'tipoDeDefecto':[
        {
            descripcion: 'reproceso'
        },
        {
            descricion: 'observado'
        }

    ],
    'Usuario':[
        {
            usuario: 'priscila',
            contraseña: 1234
        },
        {
            usuario: 'pablo',
            contraseña: 1235
        },
        {
            usuario: 'lourdes',
            contraseña: 1236
        },
        {
            usuario: 'sofia',
            contraseña: 1237
        }
    ]
    
    
}
module.exports.InformacionCargada = InformacionCargada;





