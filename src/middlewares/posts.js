const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(req, res, next) {
  try {
    const newPost = new Post(req.body);

    const savePost = await newPost.save();

    return res.status(201).json(savePost);

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function updatePost(req, res, next) {
  try {
    const { id } = req.params;

    const postExists = await Post.exists({_id: id});

    if(!postExists){
      return res.status(400).json({message: 'Post não encontrado'});
    }

    const post = await Post.findById({_id: id});

    const { userId } = req.body;

    if(post.userId === userId){
      await post.updateOne({ $set: req.body });

      return res.status(200).json({message: 'Post atualizado com sucesso'});
    } else {
      return res.status(403).json({error: 'Usuário não tem permissão de edição'});
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function deletePost(req, res, next) {
  try {
    const { id } = req.params;

    const postExists = await Post.exists({_id: id});

    if(!postExists){
      return res.status(400).json({message: 'Post não encontrado'});
    }

    const post = await Post.findById({_id: id});

    const { userId } = req.body;

    if(post.userId === userId){
      await post.deleteOne();

      return res.status(200).json({message: 'Post removido com sucesso'});
    } else {
      return res.status(403).json({error: 'Usuário não tem permissão para remover o post'});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function likePost(req, res, next) {
  try {
    const { id } = req.params;

    const postExists = await Post.exists({_id: id});

    if(!postExists){
      return res.status(400).json({message: 'Post não encontrado'});
    }

    const post = await Post.findById({_id: id});

    const { userId } = req.body;

    if(!post.likes.includes(userId)){
      await post.updateOne({ $push: { likes: userId } });

      return res.status(200).json({message: 'Curtida adicionada'});
    } else{
      await post.updateOne({ $pull: { likes: userId } });
      return res.status(200).json({message: 'Curtida removida'});
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function getPost(req, res, next) {
  try {
    const { id } = req.params;

    const postExists = await Post.exists({_id: id});

    if(!postExists){
      return res.status(400).json({message: 'Post não encontrado'});
    }

    const post = await Post.findById({_id: id});

    return res.status(400).json(post);

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function getTimelinePost(req, res, next) {
  try {
    const { userId } = req.body;

    const currentUser = await User.findById({ _id: userId });
    const userPosts = await Post.find({ userId: currentUser._id});
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    )

    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

module.exports ={
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getTimelinePost
}