var path = require('path');
var requireDir = require('require-dir');
requireDir(path.join(__dirname, 'tasks'), {recurse: true});