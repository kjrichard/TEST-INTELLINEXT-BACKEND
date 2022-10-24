

import Book from "../models/book.model";
import { Request, Response } from 'express';
import BookInterface from "../interfaces/book.interface";



export const getAll = async( req: Request , res: Response ) => {

    const limit:  number = 10;
    const skip :  number = 10;
 
    try {
        const [ books, total ] = await Promise.all([
            Book.find({}).skip( skip )
                         .limit( limit ),
            Book.count()
        ]);

        if( !books.length ) 
            return res.status( 404 ).json({ 
                msg: 'No hay libros registrados.'
            }); 
       
            
        res.json({ 
            status: true, 
            books,
            total
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            status: false, 
            msg: 'Problema del servidor.' 
        }); 
    } 
    
}

export const getOne = async( req: Request , res: Response ) => {
 
    const id: string = req.params.id;
    try {
        const books = await Book.findById( id );

        if( !books ) {
            return res.status( 404 ).json({ 
                 msg: 'Libro no encontrado'
            });
        }

        res.json({ status: true, books });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            status: false, 
            msg: 'Problema del servidor.' 
        }); 
    } 
    
}


export const create = async( req: Request , res: Response ) => {
 
    const body: BookInterface = req.body;
    try {
        
        const newBook = new Book( body );
        await newBook.save();
      
        res.json({ 
            msg: 'Registro exitoso.',  
            newBook 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            status: false, 
            msg: 'Problema del servidor.' 
        }); 
    } 
    
}

export const update = async( req: Request , res: Response ) => {
 
    const id  : string = req.params.id;
    const body: BookInterface = req.body;
    try {
        
        const bookDB = await Book.findById( id );
        if( !bookDB ) {
            return res.status( 404 ).json({ 
                msg: 'El libro no existe.', 
                status: true
            });
        }
        
        const updatedBook = await Book.findByIdAndUpdate( id, body, { new: true });

        res.json({ status: true, 
            msg: 'Actualizacion exitosa.', 
            updatedBook 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: 'Problema del servidor.' }); 
    } 
    
}

export const deleteB = async( req: Request , res: Response ) => {
 
    const id: string = req.params.id;
    try {
        
        const bookDB = await Book.findById( id );

        if( !bookDB ) {
            return res.status( 404 ).json({ 
                msg: 'No existe un usuario por ese id.'
            })
        }
       
        const deletedBook = await Book.findByIdAndDelete( id );
        res.json({ status: true, msg: 'Usuario eliminado.', deletedBook });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Problema del servidor.'
        }); 
    } 
    
}

