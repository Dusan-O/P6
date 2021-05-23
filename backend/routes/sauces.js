const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, saucesCtrl.createOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifyOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);
router.get('/:id', auth, saucesCtrl.getAllSauce);
router.get('/', auth, saucesCtrl.getOneSauce);

router.post('/:id/like', auth, saucesCtrl.rateOneSauce);

module.exports = router;    