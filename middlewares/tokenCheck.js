const jwt = require('jsonwebtoken');

const decodeUserId = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    req.token = decodedToken;
    next();
  } catch (err) {
    return res
        .status(500)
        .json({message: err.message || 'Internal Server Error'});
  }
};

module.exports = decodeUserId;
