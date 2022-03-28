const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getFile = {
  params: Joi.object().keys({
    fileToken: Joi.string().required(),
  }),
};

const uploadFile = {
  body: Joi.object().keys({
    //fileName
  }),
};

module.exports = {
  getFile,
  uploadFile,
};
