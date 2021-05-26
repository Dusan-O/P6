const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


// routes CRUD: Create, Read, Update, Delete
// routes: auth pour l'autentification
// routes: multer pour gérer les fichiers images
router.post('/', auth, multer, saucesCtrl.createOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifyOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post('/:id/like', auth, saucesCtrl.rateOneSauce);

module.exports = router;    