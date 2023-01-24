const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/invention')
const auth = require('../middlewares/auth')

//POST

router.post('/', auth, stuffCtrl.createStuff);

//GET

router.get('/', auth, stuffCtrl.getOneStuff);

//GET

router.get('/all', stuffCtrl.getAllStuff);

//DELETE

router.delete('/:id', auth, stuffCtrl.deleteStuff);

module.exports = router;