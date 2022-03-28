const ExtentionArray = ['.jpg', '.png', '.gif']

/**
 * Determines if a file is an image from the extension
 * @param {String} path
 * @returns {boolean}
 */
const IsImageFromFormat = (path) => {
  return ExtentionArray.includes(path);
}

module.exports = IsImageFromFormat
