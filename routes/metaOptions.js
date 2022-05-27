const router = require('express').Router();
const metaOptionsController = require('../controllers/metaOptionsController');

router.get('/get',metaOptionsController.get);
router.post('/save/', metaOptionsController.save);
router.delete('/delete/:id', metaOptionsController.delete);

module.exports = router
