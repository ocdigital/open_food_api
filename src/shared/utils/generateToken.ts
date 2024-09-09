import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwtConfig';

export const generateToken = ():string => {
    const paylod = {
        role:'api_acess',
    };

    const token = jwt.sign(paylod, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
    return token;
    
};

console.log('Token:', generateToken());