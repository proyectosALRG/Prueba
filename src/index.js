const express = require('express');
const app=express();
const morgan=require('morgan');

//configuraciones del servidor
app.set('port', process.env.PORT || 3000); //establece el puerto que se va a usar



//middlewares
app.use(morgan('dev'));
app.use(express.json()); //para manejar salidas en formato json
//app.use(express.urlencoded({extended: false})); //para manejar texto que viene desde formularios

//rutas
app.use(require('./routes/index'));
app.use('/api/errores',require('./routes/errores'));


//inicio del servidor
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});