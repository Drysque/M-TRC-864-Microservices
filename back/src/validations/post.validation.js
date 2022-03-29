const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getPost = {
  query: Joi.object().keys({
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPostById = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  addPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};
