const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');

const yetkiKontrol = require('../util/yetkiKontrol');


const notController=require('../controllers/not');

router.get('/not-ekle', yetkiKontrol, notController.getNotEkle);
router.post('/not-ekle',yetkiKontrol, notController.postNotEkle);

exports.routes=router;