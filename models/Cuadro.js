import mongoose from "mongoose";

const cuadroSchema = mongoose.Schema({
    nombre:{
        type:String,
        trim:true,
        required:true,
    },
    descripcion:{
        type:String,
        trim:true,
        required:true,
    },
    estado:{
        type:Boolean,
        default:false,
    },
    fechaEntrega:{
        type:Date,
        required: true,
        default:Date.now()
    },
    tipo:{
        type: String,
        required:true,
        enum:['Monofásico', 'Bifásico', 'Trifásico'],
    },
    espacio:{
        type: String,
        required:true,
        enum:['2', '4', '6', '8', '12', '20', '30', '40', '42'],
    },
    formulas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Formula",
        },
    ],
    proyecto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Proyecto',
    },
    completado:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        default: null,
    },
},
    {
        timestamps:true,

})

const Cuadro = mongoose.model('Cuadro', cuadroSchema)
export default Cuadro