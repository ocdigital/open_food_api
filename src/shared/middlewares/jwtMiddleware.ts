import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from "../../config/jwtConfig";

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token is required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, jwtConfig.secretKey);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}