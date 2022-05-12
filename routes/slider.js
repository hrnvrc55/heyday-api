const router = require('express').Router();
const sliderController = require('../controllers/sliderController');
const multer  = require('multer')

const newImage = "hey-day";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/sliders')
    },
    filename: (req, file, cb) => {
        cb(null, `${newImage}-${Date.now()}.png`)
    }
})

const upload = multer({ storage: storage })

router.get('/all',sliderController.getAll);
router.get('/get/:id', sliderController.getOne);
router.post('/save/', sliderController.save);
router.put('/update/:id', sliderController.update);
router.delete('/delete/:id', sliderController.delete);
router.post('/upload-image',upload.single("blob"), sliderController.uploadImage);

module.exports = router