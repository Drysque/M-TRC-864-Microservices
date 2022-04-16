const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getFile = {
  params: Joi.object().keys({
    fileToken: Joi.string().required(),
  }),
};

const uploadFile = {
  file: Joi.string().required(),
};

module.exports = {
  getFile,
  uploadFile,
};
