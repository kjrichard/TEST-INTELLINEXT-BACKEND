import { prop, getModelForClass } from "@typegoose/typegoose";

export class Book {
    
    @prop()
    ISBN:                number | string ;

    @prop()
    Book_Title:          number | string;

    @prop()
    Book_Author:         number | string;

    @prop()
    Year_Of_Publication: number | string;

    @prop()
    Publisher:           number | string;

    @prop()
    Image_URL_S:         number | string;

    @prop()
    Image_URL_M:         number | string;

    @prop()
    Image_URL_L:         number | string;
}

const BookModel = getModelForClass( Book );
export default BookModel;
