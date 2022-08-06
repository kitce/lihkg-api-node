import debugFactory from 'debug';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const debug = debugFactory('lihkg-api-node:config:config');

const { DEBUG } = process.env;

const config = {
  debug: DEBUG,
  paths: {
    library: path.join(process.cwd(), './dist/lib/main.js')
  }
};

debug('config', config);

export default config;
