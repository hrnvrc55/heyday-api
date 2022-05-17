const router = require('express').Router();
const workController = require('../controllers/workController');
const multer = require('multer');
const uploader = multer({
    storage: multer.memoryStorage(),
});
router.get('/all', workController.getAll);
router.post('/save', workController.save);
router.delete('/delete/:id', workController.delete);
router.put('/update', workController.update);
router.post('/upload-image',uploader.single('image'), workController.uploadImage)
router.get('/get-images/:id', workController.getImages)
router.get('/get-images/', workController.getCoverImages)
router.get('/get-works-with-images/', workController.getWorksWithImages)
router.post('/select-cover-image/', workController.selectCoverImage)
router.get('/get-with-slug', workController.getWorkWithSlug)
router.delete('/delete-image/:id', workController.deleteImage)


module.exports = router

