const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/cocktails-recipes',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '970259470300289',
        appSecret: 'cf48f1e7fcda38c97c3583357d37a401'
    },
};