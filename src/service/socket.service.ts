import {Server as SocketIOServer} from 'socket.io';
import { comprobarJWT } from '../helpers/jwt';
import { getUsuario, usuarioConectado, usuarioDeconectado } from '../controllers/socket.controllers';
class Sockets {

    public io:SocketIOServer;

    constructor(io:SocketIOServer){
        this.io = io
        this.SocketsEvents()
    }

    public SocketsEvents (){
        console.log('SocketsEvents')
        this.io.on('connection', async(socket)=>{
           
            const [valuido , uid ] = comprobarJWT(socket.handshake.query['x-token'])
            
            if(!valuido){
                console.log('socket no identificado')
                return socket.disconnect() 
            }
            //verifiacmos si el usuario conneectado
            await usuarioConectado(uid)
          
            console.log('Cliente conectado', uid)

            //Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuario())

            socket.on('disconnect', async()=>{
                console.log('Cliente desconectado')
                await usuarioDeconectado(uid)
            }

                
            )
        
        })
    }
}

export default Sockets;