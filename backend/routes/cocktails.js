const express = require('express');
const multer = require("multer");
const {nanoid} = require("nanoid");
const Cocktail = require("../models/Cocktail");
const path = require("path");
const config = require("nodemon/lib/config");
const authorization = require("../middleware/authorization");
const permit = require("../middleware/permit");

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

router.get('/', async (req, res, next) => {
    try{
        const cocktails = await Cocktail.find();

        return res.send(cocktails);
    }catch (e) {
        next(e);
    }
});

router.post('/', authorization, permit('user', 'admin'), upload.single('image'), async (req, res, next) => {
    try{
        console.log(req.body)
        const cocktail = new Cocktail({
            user: req.body.user,
            title: req.body.title,
            image: null,
            recipe: req.body.recipe,
            ingredients: req.body.ingredients
        })

        if(req.user.role === 'admin'){
            cocktail.isPublished = true;
        }

        if(req.file){
            cocktail.image = req.file.filename;
        }

        await cocktail.save();

        return res.send(cocktail);
    }catch (e) {
        next(e);
    }
});

module.exports = router;