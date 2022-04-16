const httpStatus = require('http-status');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a comment object
 * @param {Object} commentBody
 * @param {User} reqUser
 * @returns {Promise<User>}
 */
const addComment = async (commentBody, reqUser) => {
  commentBody.user = reqUser._id;
  const comment = await Comment.create(commentBody);
  return comment;
};

/**
 * Delete a comment object
 * @param {ObjectId} commentId
 * @param {User} reqUser
 * @returns {Promise<Comment>}
 */
const deleteComment = async (commentId, reqUser) => {
  const comment = await Comment.findById(commentId);

  if (comment == undefined)
    throw new ApiError(404, 'Comment not found.');
  if (comment.user != reqUser.id)
    throw new ApiError(403, 'Forbidden.');

  await comment.remove();

  return comment;
};

/**
 * Query for comments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryComments = async (filter, options) => {
  const comments = await Comment.paginate(filter, options);
  return comments;
};

/**
 * Query for comments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getCommentById = async (commentId) => {
  const comment = await Comment.findById(commentId);
  return comment;
};

/**
 * Find comments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const findComments = async (filter, options) => {
  const comments = await Comment.find(filter).sort(options)
  return comments;
};

module.exports = {
  queryComments,
  addComment,
  deleteComment,
  getCommentById,
  findComments,
};
