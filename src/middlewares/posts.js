const Post = require('../models/Post');

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

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function deletePost(req, res, next) {
  try {

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function likePost(req, res, next) {
  try {

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function getPost(req, res, next) {
  try {

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
};

async function getTimelinePost(req, res, next) {
  try {

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