const express = require('express');
const agentCtrl = require('../controllers/agent')
const router = express.Router();
const auth = require('../middlewares/auth')

//POST
//enregistre un utilisateur
router.post('/register', agentCtrl.signup);

//POST
//connecter un utilisateur
router.post('/login', agentCtrl.login);

//POST
//enregistre un utilisateur
router.post('/update', auth, agentCtrl.update);

module.exports = router