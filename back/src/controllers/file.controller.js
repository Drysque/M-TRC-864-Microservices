const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fileService } = require('../services');

const uploadFile = catchAsync(async (req, res) => {
  console.log(req.files);
  res.status(httpStatus.OK).send({});
});

const getFile = catchAsync(async (req, res) => {
  const file = await fileService.findFileByAccessToken(req.params.fileToken);

  res.send(file);
});

module.exports = {
  getFile,
  uploadFile,
};
