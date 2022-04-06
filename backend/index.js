const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/users');
const cocktails = require('./routes/cocktails');
const config = require('./config');
const app = express();

const port = 8000;

const whiteList = ['http://localhost:4200', 'https://localhost:4200'];

const corsOptions = {
    origin: (origin, callback) => {
        if(origin === undefined || whiteList.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/users', users);
app.use('/cocktails', cocktails);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`App listen on port ${port}!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));