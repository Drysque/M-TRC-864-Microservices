const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const addPost = catchAsync(async (req, res) => {
  const result = await postService.addPost(req.body, req.user);
  res.status(httpStatus.OK).send(result);
});

const getPost = catchAsync(async (req, res) => {
  const filter = {};
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.queryPosts(filter, options);
  res.send(result);
});

const getPostById = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId)
  res.send(post);
});

const updatePost = catchAsync(async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.partyId, req.body, req.user);

    res.send(post);
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
});

const deletePost = catchAsync(async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.partyId, req.user);

    res.send(post);
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
});


module.exports = {
  addPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};
