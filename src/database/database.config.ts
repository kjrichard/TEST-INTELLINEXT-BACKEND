
import { connect }  from 'mongoose';

export const dbConnection = async() => {

    try {
        await connect("mongodb+srv://kjrichard:Jair0425@cluster0.0utnfw3.mongodb.net/libraryDB?retryWrites=true&w=majority");
        console.log('Conexion exitosa a la base de datos');
    } catch (error) {
        console.log( error );
        throw new Error(' Error a la hora de iniciar la base de datos ')
    }
    
}

// mongodb+srv://admin:Jair0425@cluster0.0utnfw3.mongodb.net/libraryDB?retryWrites=true&w=majority





