const jwt = require('jsonwebtoken');

// AUTHENTIFICATION
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // on sépare le bearer et on ne garde que le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// on vérifie (avec la méthode verify de jsonwebtoken) que le token, correspeond au secret (token) 
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};