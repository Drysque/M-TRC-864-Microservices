const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addPost = {
  body: Joi.object().keys({
    description: Joi.string().required(),
  }),
  files: Joi.object().required(),
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
    description: Joi.string(),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
};

const getPostMessages = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
};

const addMessageOnPost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};

module.exports = {
  addPost,
  getPostById,
  updatePost,
  deletePost,
  getPostMessages,
  addMessageOnPost,
};
