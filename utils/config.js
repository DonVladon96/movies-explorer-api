require('dotenv').config();

const DEV_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const { DB_URL, NODE_ENV } = process.env;
const endpoint = NODE_ENV === 'production' ? DB_URL : DEV_URL;

module.exports = {
  endpoint,
};
