const httpStatus = require('http-status');
const { File } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a file object
 * @param {Object} fileBody
 * @returns {Promise<User>}
 */
const uploadFile = async (fileBody) => {
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

module.exports = {
  queryFiles,
  uploadFile,
};
