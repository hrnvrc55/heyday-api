const router = require('express').Router();
const roleController = require('../controllers/roleController');

router.get('/all',roleController.getAll);
router.get('/get/:id', roleController.getOne);
router.post('/save/', roleController.save);
router.put('/update/:id', roleController.update);
router.delete('/delete/:id', roleController.delete);

module.exports = router
