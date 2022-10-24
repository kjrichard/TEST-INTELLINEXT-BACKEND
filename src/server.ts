import express, { Application } from 'express';

import cors from 'cors';
import morgan from "morgan";
import { dbConnection } from './database/database.config';
import bookRoutes from './routes/book.router';
import searchRoutes from './routes/search.router';


class Server {

    private app: Application;
    private port: number;
    private apiPaths = {
        books :  '/api/books',
    }

    constructor() {
        this.app  = express();
        this.port = 3000;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            
            await dbConnection();
            console.log('Database online');

        } catch ( error )  {
            console.log( error );
            throw new Error(' Error de conexion ');  
            
        }

    }

    middlewares() {

        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( morgan('dev'));
        this.app.use( cors());

    }

    routes() {
        this.app.use( this.apiPaths.books,  bookRoutes   ),
        this.app.use( this.apiPaths.books,  searchRoutes )
       
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;