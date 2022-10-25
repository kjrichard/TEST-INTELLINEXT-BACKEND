

import Book from "../models/book.model";
import { Request, Response } from 'express';
import BookInterface from '../interfaces/book.interface';



export const search = async( req: Request , res: Response ) => {
 
    let field  : string = req.params.field;
    const body : any = req.params.body;
    const regex = new RegExp( body, 'i' );

    const limit: number =  10
    const page = Number(req.query.page) || 1
    const skip: any =  page == 1 ? 0 : (page - 1) * limit;
    let param: any = parseInt(body);
    
    try {

        let bookData: BookInterface [] = [];
        let total: any; 
        switch( field ) {

        /*     case  'ISBN':
                bookData = await Book.find({ ISBN: regex }).skip( skip).limit( limit );
                
            break; */

            case  'ISBN':
                bookData = await Book.find({ ISBN: param }).skip( skip).limit( limit );
                
            break;

            case  'Book_Title':
                bookData = await Book.find({ Book_Title: regex }).skip( skip).limit( limit);
                
            break;

            case  'Year_Of_Publication':
                bookData = await Book.find({ Year_Of_Publication: param }).skip( skip).limit( limit);
                
            break;

            case  'Book_Author':
                bookData = await Book.find({ Book_Author: regex }).skip( skip).limit( limit);
                
            break;

            case  'Publisher':
                bookData = await Book.find({ Publisher: regex }).skip( skip).limit( limit);
                
            break;

            default:
            return res.status(400).json({
                status: false,
                msg: 'No se encontraron registros'
            });

        }

        const data = {
            page: page,
            totalPerPage: bookData.length,
            totalPages: Math.ceil( bookData.length / limit),
            total: bookData.length,
            data: bookData,
            
        } 
        
       
        res.json({ 
            status: true, 
            msg: 'Resultados de la busqueda.',
            data, 
              
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: 'Problema del servidor.' }); 
    } 
    
}


