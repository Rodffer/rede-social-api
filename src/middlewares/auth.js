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

module.exports ={
  registerUser
}