

import Book from "../models/book.model";
import { Request, Response } from 'express';
import BookInterface from '../interfaces/book.interface';



export const search = async( req: Request , res: Response ) => {
 
    let field  : string = req.params.field;
    const body : any = req.params.body;
    const regex = new RegExp( body, 'i' );

    const limit: number  =  10;
    const skip : number  =  0;

    try {

        let data: BookInterface [] = [];
        let total: number; 
        switch( field ) {

            case  'ISBN':
                data = await Book.find({ ISBN: regex }).skip( skip).limit( limit);
                total = await Book.count();
            break;

            case  'Book_Title':
                data = await Book.find({ Book_Title: regex }).skip( skip).limit( limit);
                total = await Book.count();
            break;

            case  'Year_Of_Publication':
                data = await Book.find({ Year_Of_Publication: regex }).skip( skip).limit( limit);
                total = await Book.count();
            break;

            case  'Book_Author':
                data = await Book.find({ Book_Author: regex }).skip( skip).limit( limit);
                total = await Book.count();
            break;

            case  'Publisher':
                data = await Book.find({ Publisher: regex }).skip( skip).limit( limit);
                total = await Book.count();
            break;

            default:
            return res.status(400).json({
                status: false,
                msg: 'No se encontraron registros'
            });

        }
        
       
        res.json({ 
            status: true, 
            msg: 'Resultados de la busqueda.',
             data, 
             total 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: 'Problema del servidor.' }); 
    } 
    
}
