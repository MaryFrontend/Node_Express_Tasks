import jwt from 'jsonwebtoken';
import { validationResult }from 'express-validator';
import { string } from 'yargs'; 
import secret  from '../../app/secret';

export const generateAccessToken = (username) => {
    const payload = {
        username
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}