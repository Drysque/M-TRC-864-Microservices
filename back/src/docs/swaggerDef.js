const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Nysos Documentation',
    version,
    license: {
      name: 'EIP',
      url:
        'https://media-exp1.licdn.com/dms/image/C5603AQFxIX8VwOWAIQ/profile-displayphoto-shrink_200_200/0/1554474920022?e=1625097600&v=beta&t=syQGJnOHcm9PEMMu-PixZmXlE-FGMhldiPt34eAHbjk',
    },
  },
  servers: [
    {
      url: `${config.apiUrl}/v1`,
    },
  ],
};

module.exports = swaggerDef;
