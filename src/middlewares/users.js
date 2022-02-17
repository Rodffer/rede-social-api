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

async function searchUser(req, res, next) {
  try {
    // const { id } = req.params;

    // const existsUser = await User.exists({ id });

    // if(!existsUser){
    //   return res.status(400).json({ error: 'Usuário não encontrado'});
    // }

    const { username, userId } = req.query;

    const response = userId ? await User.findById({userId}) : await User.findOne({username});

    const { password, updatedAt, ...other} = response._doc;

    if(!response){
      return res.status(400).json({message: 'Não foi possível buscar o usuário'});
    }

    return res.status(200).json(other);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function followUser(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if(userId !== id){

      const user = await User.findById({_id: id});
      const currentUser = await User.findById({_id: userId});

      if(!user.followers.includes(userId)){
        await user.updateOne({ $push: { followers: userId }});
        await currentUser.updateOne({ $push: { followings: id }});

        return res.status(200).json({message: 'Usuário seguido com sucesso'});

      } else{ 
        return res.status(403).json({message: 'Você já segue esse usuário'});
      }


    } else {
      return res.status(400).json({message: 'Não é possível seguir o próprio perfil'});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function unfollowUser(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if(userId !== id){

      const user = await User.findById({_id: id});
      const currentUser = await User.findById({_id: userId});

      if(user.followers.includes(userId)){
        await user.updateOne({ $pull: { followers: userId }});
        await currentUser.updateOne({ $pull: { followings: id }});

        return res.status(200).json({message: 'Usuário deixou de seguir com sucesso'});

      } else{ 
        return res.status(403).json({message: 'Você não segue esse usuário'});
      }


    } else {
      return res.status(400).json({message: 'Não é possível deixar de seguir o próprio perfil'});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

module.exports ={
  updateUser,
  deleteUser,
  searchUser,
  followUser,
  unfollowUser
}