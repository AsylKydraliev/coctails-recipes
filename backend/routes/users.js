const express = require('express');
const mongoose = require('mongoose');
const multer = require("multer");
const {nanoid} = require("nanoid");
const path = require("path");
const User = require('../models/User');
const config = require("../config");
const axios = require("axios");

const fetch = require('node-fetch');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.post('/', upload.single('avatar'), async (req, res, next)=>{
   try{
       const user = new User({
           email: req.body.email,
           password: req.body.password,
           displayName: req.body.displayName,
           avatar: null
       });

       if(req.file){
           user.avatar = req.file.filename;
       }

       user.generateToken();
       await user.save();

       return res.send(user);
   } catch(error){
       if(error instanceof mongoose.Error.ValidationError){
           return res.status(400).send(error);
       }
       return next(error);
   }
});

router.post('/sessions', async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(400).send({error: 'Wrong data'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(400).send({error: 'Wrong data'});
        }

        user.generateToken();
        await user.save();

        return res.send(user);

    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
   }
});

router.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const message = {message: 'OK'};

        if (!token) return res.send(message);

        const user = await User.findOne({token});

        if (!user) return res.send(message);

        user.generateToken();
        await user.save();

        return res.send(message);
    } catch (e) {
        next(e);
    }
});

router.post('/facebookLogin', async (req, res, next) => {
    try{
        const inputToken = req.body.authToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if(!user){
            user = await User.findOne({email: req.body.email});
        }

        if(!user){
            const avatarUrl = nanoid() + '.jpeg';

            function downloadFile(url, path) {
                return fetch(url).then(res => {
                    res.body.pipe(fs.createWriteStream(path));
                });
            }

            downloadFile(req.body.avatar, `./public/uploads/${avatarUrl}`);

            user = new User({
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatar: avatarUrl
            })
        }

        user.generateToken();

        await user.save();

        return res.send(user);
    }catch (e) {
        next(e);
    }
});

module.exports = router;