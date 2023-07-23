
import Cuadro from "../models/Cuadro.js"
import Formula from "../models/Formula.js"


const agregarFormula = async (req, res) =>{
    const {cuadro}=req.body
    const existeCuadro = await Cuadro.findById(cuadro)
    try {
        const formulaAlmacenada = await Formula.create(req.body)
        existeCuadro.formulas.push(formulaAlmacenada._id)
        await existeCuadro.save()
        res.json(formulaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}
const obtenerFormula = async (req, res) =>{
    const {id} =req.params
    const formulas = await Formula.findById(id)
    res.json(formulas)
}
const actualizarFormula = async (req, res) =>{
    const {id} =req.params
    const formula = await Formula.findById(id).populate('cuadro')


   formula.nombre = req.body.nombre || formula.nombre
   formula.wattsInd = req.body.wattsInd || formula.wattsInd
   formula.cantidad = req.body.cantidad || formula.cantidad
   formula.wattsTotal = req.body.wattsTotal || formula.wattsTotal
   formula.factorDemanda = req.body.factorDemanda || formula.factorDemanda
   formula.factorDemandaVa = req.body.factorDemandaVa || formula.factorDemandaVa
   formula.volts = req.body.volts || formula.volts
   formula.vl = req.body.vl || formula.vl
   formula.neutro = req.body.neutro || formula.neutro
   formula.hilos = req.body.hilos || formula.hilos
   formula.linea = req.body.linea || formula.linea
   formula.iamps = req.body.iamps || formula.iamps
   formula.vaP = req.body.vaP || formula.vaP
   formula.amps = req.body.amps || formula.amps
   formula.vaS = req.body.vaS || formula.vaS
   formula.ft = req.body.ft || formula.ft
   formula.fa = req.body.fa || formula.fa
   formula.temperatura = req.body.temperatura || formula.temperatura
   formula.tipoEquipo = req.body.tipoEquipo || formula.tipoEquipo
   formula.metodo1 = req.body.metodo1 || formula.metodo1
   formula.metodo2 = req.body.metodo2 || formula.metodo2
   formula.ampCorr = req.body.ampCorr || formula.ampCorr
   formula.condCal = req.body.condCal || formula.condCal
   formula.condTierra = req.body.condTierra || formula.condTierra
   formula.hilosTierra = req.body.hilosTierra || formula.hilosTierra
   formula.conductorNeutro = req.body.conductorNeutro || formula.conductorNeutro
   formula.milimetrosTierra = req.body.milimetrosTierra || formula.milimetrosTierra
   formula.totalMilimetros = req.body.totalMilimetros || formula.totalMilimetros
   formula.canalizacion = req.body.canalizacion || formula.canalizacion
   formula.caidaTension = req.body.caidaTension || formula.caidaTension
   formula.porcentajeCaidaTension = req.body.porcentajeCaidaTension || formula.porcentajeCaidaTension

    try {
        const formulaAlmacenada = await formula.save()
        res.json(formulaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}
const eliminarFormula = async (req, res) =>{
    const {id} =req.params
    const formula = await Formula.findById(id)

    try {
        await formula.deleteOne()
        res.json({msg:'Dato eliminado'})
    } catch (error) {
        console.log(error)
    }
}

export {
    obtenerFormula,
    agregarFormula,
    actualizarFormula,
    eliminarFormula,
}