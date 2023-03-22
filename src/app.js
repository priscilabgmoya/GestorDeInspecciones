/**estamos declarando los modulos que vamos a utilizar en nuestra API */
const express = require('express');
const app = express();
const morgan = require('morgan');
const route = require('./routes/index');
const cors = require('cors')

//settings
const PORT = 3308;
app.set("port",PORT);
//midlewares son funciones intermedias entre una peticion y una respuesta 
app.use(morgan("dev"));
//permite leer el cuerpo de la solicitud en formato json
app.use(express.json())
//permite leer los datos enviados en un formulario standard
app.use(express.urlencoded({extended: true}))
//habilita Cross-Origin Resource Sharing a todas las rutas
app.use(cors());

//rutas
app.get('/',(req,res)=>{
    res.send('Hola Mundo!!!')
});

app.get('/ping',(req,res)=>{
    res.json({msg:'pong'})
});

app.use(route.rutasGestionModelo);
app.use(route.rutasGestionUsuarios);
app.use(route.rutasGestionColor);
app.use(route.rutasNroLinea);
app.use(route.rutasTurno);
app.use(route.rutasOrdenProduccion);
app.use(route.rutasJornadaLaboral);
app.use(route.rutasDefecto);
app.use(route.rutasIncidencia);
app.use(route.rutasPie);

export default app; 