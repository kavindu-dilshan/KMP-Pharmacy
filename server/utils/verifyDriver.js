import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyDriverToken = (req, res, next) => {
  const token = req.cookies.driver_access_token; 
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, driver) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.driver = driver; 
    next();
  });
};
