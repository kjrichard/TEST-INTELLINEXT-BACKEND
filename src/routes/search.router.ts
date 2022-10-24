

import { Router } from 'express';
import { search } from '../controllers/search.controller';


const router = Router();



router.get ('/:field/:body', search );



export default router;