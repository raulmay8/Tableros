import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import cuadroRoutes from './routes/cuadroRoutes.js'
import formulaRoutes from './routes/formulaRoutes.js'

const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

//configuracion de cors
const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Error de cors'))
        }
    }
}

app.use(cors(corsOptions))
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/cuadros', cuadroRoutes)
app.use('/api/formulas', formulaRoutes)

const PORT = process.env.PORT || 4000 

const servidor = app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//socket io

import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors:{
        origin: process.env.FRONTEND_URL,
    },
})

io.on("connection", (socket) =>{

    socket.on('abrir proyecto', (proyecto) =>{
        socket.join(proyecto)
    })
    socket.on('nuevo cuadro', (cuadro) => {
        const proyecto = cuadro.proyecto
        socket.to(proyecto).emit("cuadro agregado", cuadro)
    })
    socket.on('eliminar cuadro', (cuadro) =>{
        const proyecto = cuadro.proyecto
        socket.to(proyecto).emit('cuadro eliminado', cuadro)
    })
    socket.on('actualizar cuadro', (cuadro) =>{
        const proyecto = cuadro.proyecto._id
        socket.to(proyecto).emit('cuadro actualizado', cuadro)
    })
    socket.on('cambiar estado', (cuadro) => {
        const proyecto = cuadro.proyecto._id
        socket.to(proyecto).emit("nuevo estado", cuadro)
    })
})
