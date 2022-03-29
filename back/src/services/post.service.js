const httpStatus = require('http-status');
const { Post, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a post object
 * @param {Object} postBody
 * @param {User} reqUser
 * @returns {Promise<User>}
 */
const addPost = async (postBody, reqUser) => {
  postBody.user = reqUser._id;
  const post = await Post.create(postBody);
  return post;
};

/**
 * Delete a post object
 * @param {ObjectId} postId
 * @param {User} reqUser
 * @returns {Promise<Post>}
 */
const deletePost = async (postId, reqUser) => {
  const post = await Post.findById(postId);

  if (post == undefined)
    throw new ApiError(404, 'Post not found.');
  if (post.user != reqUser.id)
    throw new ApiError(401, 'Unauthorized.');

  await post.remove();

  return post;
};

/**
 * Update a post object
 * @param {ObjectId} postId
 * @param {Object} postBody
 * @param {User} reqUser
 * @returns {Promise<Post>}
 */
const updatePost = async (postId, postBody, reqUser) => {
  const post = await Post.findById(postId);

  if (post == undefined)
    throw new ApiError(404, 'Post not found.');
  if (post.user != reqUser.id)
    throw new ApiError(401, 'Unauthorized.');

  Object.assign(post, postBody);
  await post.save();

  return post;
};

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
};

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getPostById = async (postId) => {
  const post = await Post.findById(postId);
  return post;
};

module.exports = {
  queryPosts,
  addPost,
  deletePost,
  updatePost,
  getPostById,
};
