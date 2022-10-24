import { NextFunction } from 'express';
import { validationResult } from 'express-validator';
import express from 'express';



export const validateField = async(req: express.Request, res: express.Response, next: NextFunction ) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    next();
}
