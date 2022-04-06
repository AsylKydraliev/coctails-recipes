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
        appId: '663684838047329',
        appSecret: '335c3edc437ab77d4096e4d5a43085bb'
    },
};