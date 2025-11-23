const config = require('flarum-webpack-config');

module.exports = config({
    useExtensions: [],
});

module.exports.entry = {
    'forum': './src/forum/index.js',
    'admin': './src/admin/index.js',
};
