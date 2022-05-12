const router = require('express').Router();
const aboutController = require('../controllers/aboutController');

router.get('/',(req,res) => {
    res.send(
        `<ul>
                <li>General Info: -> /general</li>
                <li>Owner: -> /owner</li>
              </ul>`
    )
})
router.get('/general',aboutController.general.get);
router.post('/general/save',aboutController.general.save);
router.get('/owner', aboutController.owner.get);
router.post('/owner/save', aboutController.owner.save);
router.get('/awards', aboutController.award.getAll);
router.post('/award/save', aboutController.award.save);
router.delete('/award/delete/:id', aboutController.award.delete);


module.exports = router

