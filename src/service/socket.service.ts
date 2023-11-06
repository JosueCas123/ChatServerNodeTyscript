import {Server as SocketIOServer} from 'socket.io';
class Sockets {

    private io:SocketIOServer;
    constructor(io:SocketIOServer){
        this.io = io
        this.SocketsEvents()
    }

    private SocketsEvents (){
        this.io.on('connection',(socket)=>{
            console.log('Cliente conectado')
        
        })
    }
}

export default Sockets;