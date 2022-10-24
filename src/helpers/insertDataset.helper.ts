
import { bookDataset } from "../helpers/booksDataset.helper";
import BookInterface from '../interfaces/book.interface';
import Book from '../models/book.model';


  
export async function insert ( ) {

    try {
       let books = await Book.find();
       if( books.length > 0 ) {
         return console.log('Los usuarios ya estan registrados en el sistema');
       }else {
        await bookDataset.results.forEach( async ( element ) => {
            let book: BookInterface = {
    
                ISBN:                   element['ISBN'],
                Book_Title:             element['Book-Title'],
                Book_Author:            element['Book-Author'],
                Year_Of_Publication:    element['Year-Of-Publication'],
                Publisher:              element['Publisher'],
                Image_URL_S:            element['Image-URL-S'],
                Image_URL_M:            element['Image-URL-M'],
                Image_URL_L:            element['Image-URL-L']
            }
            
           const newBook: BookInterface =  new Book( book );
           await Book.create( newBook );
            
        }); 
        return 'Usuarios registrados ';

       }
       
         
    } catch (error) {
        console.log( error );
        
    }
  
}
