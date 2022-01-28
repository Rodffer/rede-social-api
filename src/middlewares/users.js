const User = require('../models/User');
const bcrypt = require('bcrypt');
const yup = require('yup');

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;

    const existsUser = await User.exists({ id });

    if(!existsUser){
      return res.status(400).json({ error: 'Usuário não encontrado'});
    }

    const { userId, isAdmin } = req.body;

    if(userId === id || isAdmin){
      let { password } = req.body;

      if(password){
        try {
          req.body.password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
        } catch (error) {
          return res.status(400).json({ error: 'Não foi possível atualizar a senha'});
        }
      }

      const response = await User.findByIdAndUpdate(id, {
        $set: req.body
      });

      if(!response){
        return res.status(400).json({message: 'Não foi possível atualizar o usuário'});
      }

      return res.status(200).json({message: 'Usuário atualizado com sucesso'});
    } else {
      return res.status(403).json({ error: 'Usuário não tem autorização para a solicitação requisitada'});
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const existsUser = await User.exists({ id });

    if(!existsUser){
      return res.status(400).json({ error: 'Usuário não encontrado'});
    }

    const { userId, isAdmin } = req.body;

    if(userId === id || isAdmin){
      const response = await User.deleteOne({id});

      if(!response){
        return res.status(400).json({message: 'Não foi possível remover o usuário'});
      }

      return res.status(200).json({message: 'Usuário removido com sucesso'});
    } else {
      return res.status(403).json({ error: 'Usuário não tem autorização para a solicitação requisitada'});
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

module.exports ={
  updateUser,
  deleteUser
}