import Proyecto from "../models/Proyecto.js"
import Cuadro from "../models/Cuadro.js"


const agregarCuadro = async (req, res) =>{
    const {proyecto}=req.body
    const existeProyecto = await Proyecto.findById(proyecto)

    if(!existeProyecto){
        const error = new Error('El proyecto no existe')
        return res.status(404).json({msg: error.message})
    }
    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes los permisos para añadir tareas')
        return res.status(404).json({msg: error.message})
    }
    try {
        const cuadroAlmacenada = await Cuadro.create(req.body)
        existeProyecto.cuadros.push(cuadroAlmacenada._id)
        await existeProyecto.save()
        res.json(cuadroAlmacenada)
    } catch (error) {
        console.log(error)
    }
}
const obtenerCuadro = async (req, res) =>{
    const {id} =req.params
    const cuadro = await Cuadro.findById(id).populate('proyecto').populate('formulas')

    if(!cuadro){
        const error = new Error('Cuadro de carga no encontrado')
        return res.status(404).json({msg: error.message})
    }
    res.json(cuadro)
}
const actualizarCuadro = async (req, res) =>{
    const {id} =req.params
    const cuadro = await Cuadro.findById(id).populate('proyecto')

    if(!cuadro){
        const error = new Error('Cuadro de carga no encontrada')
        return res.status(404).json({msg: error.message})
    }
/* 
    if(cuadro.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida')
        return res.status(404).json({msg:error.message})
    } */

    cuadro.nombre = req.body.nombre || cuadro.nombre
    cuadro.descripcion = req.body.descripcion || cuadro.descripcion
    cuadro.tipo = req.body.tipo || cuadro.tipo
    cuadro.espacio = req.body.espacio || cuadro.espacio
    cuadro.fechaEntrega = req.body.fechaEntrega || cuadro.fechaEntrega

    try {
        const cuadroAlmacenado = await cuadro.save()
        res.json(cuadroAlmacenado)
    } catch (error) {
        console.log(error)
    }
}
const eliminarCuadro = async (req, res) =>{
    const {id} =req.params
    const cuadro = await Cuadro.findById(id).populate('proyecto').populate('formulas')

    if(!cuadro){
        const error = new Error('Cuadro de carga no encontrado')
        return res.status(404).json({msg: error.message})
    }

    if(cuadro.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida')
        return res.status(404).json({msg:error.message})
    }
    try {
        const proyecto = await Proyecto.findById(cuadro.proyecto)
        proyecto.cuadros.pull(cuadro._id)
        
        
        await Promise.allSettled([await proyecto.save(), await cuadro.deleteOne()])
        
        res.json({msg:'Cuadro eliminado'})
    } catch (error) {
        console.log(error)
    }
}
const cambiarEstadoCarga = async (req, res) =>{
    const {id} =req.params
    const cuadro = await Cuadro.findById(id).populate('proyecto')

    if(!cuadro){
        const error = new Error('Cuadro de carga no encontrado')
        return res.status(404).json({msg: error.message})
    }
    if(cuadro.proyecto.creador.toString() !== req.usuario._id.toString() && !cuadro.proyecto.colaboradores.some((colaborador) => colaborador._id.toString() === req.usuario._id.toString())){
        const error = new Error('Acción no válida')
        return res.status(403).json({msg:error.message})
    }
    cuadro.estado = !cuadro.estado
    cuadro.completado = req.usuario._id
    await cuadro.save()

    const cuadroAlmacenada = await Cuadro.findById(id).populate('proyecto').populate('completado')
    res.json(cuadroAlmacenada)
}

export {
    obtenerCuadro,
    agregarCuadro,
    actualizarCuadro,
    eliminarCuadro,
    cambiarEstadoCarga
}