const {Router}=require('express');
const router=Router(); 
const _ =require('underscore');

const errores=require('../reporteError.json');

//para ejecutar GET
router.get('/',(req,res)=>{
    res.json(errores);
});

//para ejecutar POST
router.post('/',(req,res)=>{
    const {fechaReporte, codigoError, descripcion,status} = req.body;
    if (fechaReporte && codigoError && descripcion && status) 
    {
        const idReporte = errores.length+1;
        const errorNuevo={idReporte, ...req.body};
        errores.push(errorNuevo);
        res.json(errores);
        
    } 
    else
    {
        res.send('Informacion incompleta')            
    }
});

//para ejecutar DELETE
router.delete('/:idReporte',(req, res)=> {
    const {idReporte} = req.params;
    _.each(errores, (error,i)=>{
        if (error.idReporte == idReporte) {
            errores.splice(i,1);
        }
    });
    res.send(errores);
});

//para PUT (modificar)
router.put('/:idReporte',(req, res)=> {
    const {idReporte} = req.params;
    const {fechaReporte, codigoError, descripcion,status} = req.body;
    if (fechaReporte && codigoError && descripcion && status) {
        _.each(errores, (error,i) => {
            if (error.idReporte==idReporte) {
                error.fechaReporte=fechaReporte;
                error.codigoError=codigoError;
                error.descripcion=descripcion;
                error.status=status;
            }
        });
        res.json(errores);
    }
    else {
        res.json({error: 'Error la actualizacion' });
    }
 });
module.exports=router;