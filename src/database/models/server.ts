import express from 'express';
import http from 'http';    
import {Server as SocketIOServer} from 'socket.io';
import Sockets from '../../service/socket.service';
import { dbConnection } from '../config';
import authRouter from '../../router/auth.router';



class Server {
    
    // tipamos {declarmos el tipo de las propiedades de la clase}

    //propidad app de tipo express.Aplication
    private app: express.Application;
    //propidad port de tipo number o string 
    private port: string | number;
    //prodiedad server de tipo httpServer
    private sever: http.Server
    //propidad io de tipo SocketIOServer
    private io: SocketIOServer

    constructor(){
        //iniciamos nuestro constructor
        this.app = express();
        this.port = process.env.PORT || 3000;
        //conectar db
        dbConnection()
        this.sever = http.createServer(this.app);
        this.io = new SocketIOServer(this.sever);
    }   

    private middelware () {


        //habilitamos el express.json 
        this.app.use(express.json());
        //api
        this.app.use('/api/v1/login', authRouter)
    }

    private configureSocket () {
        this.middelware()
        new Sockets(this.io)
    }

    public start () {
        //Llamar el middleware
        this.middelware();
        //Llamar el socket
        this.configureSocket();
        //iniciamos el servidor
        this.sever.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`)
        
        })
    }
}

export default Server;