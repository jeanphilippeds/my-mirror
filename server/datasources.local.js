
const database = require('../database.json');

const datasourcesDevConfig = {
  "memory": {
    "name": "memory",
    "connector": "memory"
  },
};

const datasourcesProdConfig = {
  "memory": {
    "name": "memory",
    "connector": "memory"
  },
};

const config = process.env.NODE_ENV === 'production' ? datasourcesProdConfig : datasourcesDevConfig;

module.exports = config;
