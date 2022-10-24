

import Book from "../models/book.model";
import { Request, Response } from 'express';
import BookInterface from "../interfaces/book.interface";
import { IPaginateOptions } from "typegoose-cursor-pagination";



export const getAll = async( req: Request , res: Response ) => {

    const limit: number =  10
    const page = Number(req.query.page) || 1
    const skip: any =  page == 1 ? 0 : (page - 1) * limit;

 
    try {
        const [ books, total ] = await Promise.all([
            Book.find( {})
                .limit( limit )
                .skip( skip )
                .sort({ _id: -1 })
            , Book.count()
        ]);

        if( !books.length ) 
            return res.status( 404 ).json({ 
                msg: 'No hay libros registrados.'
        }); 

      const data = {
            page: page,
            totalPages: Math.ceil(total / limit),
            totalPerPage: books.length,
            total: total,
            data: books
        } 
        
        res.status(200).json({ 
            data
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

