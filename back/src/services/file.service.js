const httpStatus = require('http-status');
const { File } = require('../models');
const ApiError = require('../utils/ApiError');
const https = require('http');
const FormData = require('form-data');
/**
 * Create a file object
 * @param {Object} fileBody
 * @param {Object} fileToUpload
 * @returns {Promise<File>}
 */
const uploadFile = async (fileToUpload) => {
  let form = new FormData();
  let fileToken = '';
  form.append('test', fileToUpload.files.data, fileToUpload.files.name);

  let newRequest = new Promise((resolve, reject) => {
    const req = https.request({ host: 'imageCompressor', port: 80, path: '/imageCompressor', method: 'POST', headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}` } }, function (res) {
      res.setEncoding('utf8');
      res.on('data', async function (chunk) {
        resolve(chunk);
      });
    });

    form.pipe(req);
    req.end();
    req.on('error', function (e) {
      console.error(e);
      reject(e);
    });
  })

  fileToken = await newRequest;

  const fileBody = {
    filePath: `./${fileToken}.png`,
    fileName: fileToUpload.files.name,
    accessToken: fileToken,
  };

  const file = await File.create(fileBody);
  return file;
};

/**
 * Query for files
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFiles = async (filter, options) => {
  const files = await File.paginate(filter, options);
  return files;
};

/**
 * Find a file from its access token
 * @param {String} accessToken - Access token
 * @returns {Promise<QueryResult>}
 */
const findFileByAccessToken = async (accessToken) => {
  const file = await File.findById(accessToken);
  return file;
};

module.exports = {
  queryFiles,
  uploadFile,
  findFileByAccessToken,
};
