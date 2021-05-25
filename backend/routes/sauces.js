const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// CRUD
router.post('/', auth, multer, saucesCtrl.createOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifyOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);
router.get('/:id', auth, saucesCtrl.getAllSauces);
router.get('/', auth, saucesCtrl.getOneSauce);
router.post('/:id/like', auth, saucesCtrl.rateOneSauce);

module.exports = router;    