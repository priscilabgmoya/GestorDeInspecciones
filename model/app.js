const express = require('express');
const app = express();
//setting
app.set('port', process.env.PORT || 3000)
//middleware
let{InformacionCargada} = require('./repo/repositorio')

//routes
app.get('/',(req,res)=>{
    res.send("hola")
})
app.get('/api/modelo',(req,res)=>{
    res.send(InformacionCargada.modelo)
})
app.get('/api/color/:id',(req,res)=>{
    const id = req.params.id;
    console.log(typeof(id))
    const resultado = InformacionCargada.color.filter(x => x.id === parseInt(id) );
    if(resultado.length === 0){
       return res.status(404).send(`no se encontro color con id: ${id}.`)
    }
        res.send(resultado)
    
})
app.get('/view/IniciarSesion.html?iusuario=:valor1&icontrasena=:valor2',(req,res)=>{
    const usuario = req.params.valor1;
    const contraseña = req.params.valor2;
    const resultado = InformacionCargada.Usuario .filter(x => x.usuario === usuario && x.contraseña === parseInt(contraseña));
    if(resultado.length === 0){
        return res.status(404).send(`no se encontro usuario: ${contraseña}.`)
     }

         res.status(200).send(resultado)
})
//static files
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'))
})
