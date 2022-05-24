const router = require('express').Router();
const optionsController = require('../controllers/optionsController');
const multer = require("multer");
const uploader = multer({
    storage: multer.memoryStorage(),
});

router.get('/get', optionsController.get)
router.post('/save', optionsController.save)
router.post('/upload-logo', uploader.single('image'), optionsController.uploadLogo)
router.get('/website-statics',optionsController.webSiteStatics)
module.exports = router;
