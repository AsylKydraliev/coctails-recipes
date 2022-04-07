const express = require('express');
const multer = require("multer");
const {nanoid} = require("nanoid");
const Cocktail = require("../models/Cocktail");
const path = require("path");
const config = require("../config");
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
        if(req.query.user) {
            const cocktailsByUser = await Cocktail.find({user: req.query.user});

            return res.send(cocktailsByUser);
        }

        const cocktails = await Cocktail.find();

        return res.send(cocktails);
    }catch (e) {
        next(e);
    }
});

router.post('/', authorization, permit('user', 'admin'), upload.single('image'), async (req, res, next) => {
    try{
        const cocktail = new Cocktail({
            user: req.body.user,
            title: req.body.title,
            image: null,
            recipe: req.body.recipe,
            ingredients: JSON.parse(req.body.ingredients)
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

router.post('/:id/publish', authorization, permit('admin'), async (req, res, next) => {
    try{
        await Cocktail.updateOne({_id: req.params.id}, {isPublished: req.body.isPublished});

        return res.send({message: 'Cocktail published!'});
    }catch (e){
        next(e);
    }
});

router.delete('/:id', authorization, permit('admin'), async (req, res, next) => {
    try{
        const album = await Cocktail.findByIdAndRemove({_id: req.params.id});

        return res.send(album);
    }catch (e){
        next(e);
    }
});

module.exports = router;