const jwt    = require('jsonwebtoken');
const config = process.env

const isAuth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if ( !token ) return res.status(403).send({ message: 'bro is not authorized' });
  try {
    req.user = jwt.verify(token, config.JWT_SECRET);
    return next
  } catch ( err ) {
    return res.status(403).send({ success: false, message: "bro is not authorized" })
  }
}

module.exports = isAuth