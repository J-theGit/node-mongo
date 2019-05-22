const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:mongo');

const url = config.get('server.host') + '/play';

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => debug('connected to', url))
    .catch(e => debug('could not connect', e.message));

