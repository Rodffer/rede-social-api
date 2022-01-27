const User = require('../models/User');
const bcrypt = require('bcrypt');
const yup = require('yup');

async function registerUser(req, res, next) {
  try {
    const { userName, email, password } = req.body;

    let schema = yup.object().shape({
      userName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6)
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Validação falhou'});
    }

    const existsUserName = await User.exists({ userName });

    if(existsUserName){
      return res.status(400).json({ error: 'Nome de usuário inválido'});
    }

    const existsEmail = await User.exists({ email });

    if(existsEmail){
      return res.status(400).json({ error: 'E-mail inválido'});
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

    const user = await new User({
      userName,
      email,
      password: hashedPassword
    });

    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: 'Não foi possível cadastrar o usuário'});
  }
};

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    let schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Validação falhou'});
    }

    const user = await User.findOne({ email });
    !user && res.status(400).json({ error: 'Usuário e ou senha incorretos'});

    const isValidPassword = await bcrypt.compare(password, user.password)
    !isValidPassword && res.status(400).json({ error: 'Usuário e ou senha incorretos'});
    

  
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: 'Não foi possível fazer login'});
  }
};

module.exports ={
  registerUser,
  loginUser
}