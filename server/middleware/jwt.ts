import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');
  jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user; // Now req.user contains the decoded user information
    next();
  });
}

export default authenticateToken;