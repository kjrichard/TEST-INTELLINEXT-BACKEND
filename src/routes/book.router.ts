
import { Router } from 'express';
import { getAll, create, update, deleteB, getOne } from '../controllers/book.controller';
import { validateField }  from '../middlewares/middlewares.validate-fields';
import { body } from 'express-validator';


const router = Router();

router.get    ('/'       , getAll  );

router.get    ('/:id'    , getOne  );

router.delete ('/:id'    , deleteB );

router.post   ('/'   ,
    [ 
        body('ISBN',                'El campo es obligatorio') .not().isEmpty(),
        body('Book_Title',          'El campo es obligatorio') .not().isEmpty(),
        body('Year_Of_Publication', 'El campo es obligatorio') .not().isEmpty(),
        body('Book_Author',         'El campo es obligatorio') .not().isEmpty(),
        body('Publisher',           'El campo es obligatorio') .not().isEmpty(),
        body('Image_URL_S',         'El campo es obligatorio') .not().isEmpty(),
        body('Image_URL_M',         'El campo es obligatorio') .not().isEmpty(),
        body('Image_URL_L',         'El campo es obligatorio') .not().isEmpty(),
        validateField,
    ],      
    create
);

router.put('/:id',
    [ 
        body('ISBN',                'El campo es obligatorio') .not().isEmpty(),
        body('Book_Title',          'El campo es obligatorio') .not().isEmpty(),
        body('Year_Of_Publication', 'El campo es obligatorio') .not().isEmpty(),
        body('Book_Author',         'El campo es obligatorio') .not().isEmpty(),
        body('Publisher',           'El campo es obligatorio') .not().isEmpty(),
        body('Image_URL_S',         'El campo es obligatorio') .not().isEmpty(),
        body('Image_URL_M',         'El campo es obligatorio') .not().isEmpty(),
        body('Image_URL_L',         'El campo es obligatorio') .not().isEmpty(),
        validateField,
    ],      
    update
);







export default router;