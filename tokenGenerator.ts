import jwt from 'jsonwebtoken';

const secretKey = '123456789';
const paylod = {
    role:'api_acess',
};

const token = jwt.sign(paylod, secretKey, { expiresIn: '1d' });
console.log(token);