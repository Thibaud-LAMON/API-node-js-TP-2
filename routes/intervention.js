const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/intervention')
const auth = require('../middlewares/auth')

//POST

router.post('/', auth, stuffCtrl.createStuff);//fonctionne

//GET

router.get('/', auth, stuffCtrl.getOneStuff);//fonctionne

//GET

router.get('/all', stuffCtrl.getAllStuff);//fonctionne

//DELETE

router.delete('/:id', auth, stuffCtrl.deleteStuff);

module.exports = router;