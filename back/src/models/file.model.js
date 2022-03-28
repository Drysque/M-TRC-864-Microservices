const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const fileSchema = mongoose.Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    addedTimestamp: {
      type: Date,
      default: Date.now(),
    },
  },
);

// add plugin that converts mongoose to json
fileSchema.plugin(toJSON);

/**
 * @typedef File
 */
const File = mongoose.model('File', fileSchema);

module.exports = File;
