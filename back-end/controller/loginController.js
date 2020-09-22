const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { loginService } = require('../service');
const secret = 'xablaublaxablau';

const singinEmail = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const singinEmail = await loginService.singinEmail(email, password);
  if(singinEmail.error){
    return next(singinEmail);
  }
  const { id, password:usersecret,...user } = singinEmail;
  const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  const userWithToken = {...user, token};
  var LocalStorage = require('node-localstorage').LocalStorage;
  var localStorage = new LocalStorage('./scratch');
  console.log(userWithToken)
  localStorage.setItem('user', 'JSON.stringify(userWithToken)');
  console.log('passando', localStorage.getItem('user'))
  res.status(200).json(userWithToken);
});

module.exports = {
  singinEmail,
}