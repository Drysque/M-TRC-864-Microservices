const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService, commentService } = require('../services');

const addPost = catchAsync(async (req, res) => {
  const result = await postService.addPost(req.body, req.user);
  //const file = 
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
  const messages = await commentService.findComments({ post: req.params.postId }, 'addedTimestamp-desc');
  res.send({ post: post, messages: messages});
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

const getPostMessages = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId)

  if (post == undefined) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const messages = await commentService.findComments({ post: req.params.postId }, 'addedTimestamp-desc' );
  res.send({ messages: messages });
});

const addMessageOnPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId)

  if (post == undefined) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const newMessage = await commentService.addComment({ body: req.body.message, post: req.params.postId }, req.user);
  res.send(newMessage);
});

module.exports = {
  addPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
  getPostMessages,
  addMessageOnPost,
};
