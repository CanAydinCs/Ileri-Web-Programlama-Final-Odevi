const express = require('express');
const path=require('path');

const router=express.Router();

const rootDir=require('../util/path');
const yoneticiVerisi = require('./yonetici');

const notController=require('../controllers/not');
const yetkiKontrol = require('../util/yetkiKontrol');

router.get('/', notController.getNots);
router.post('/not-sil',yetkiKontrol, notController.postSilId);
router.get('/not-detay/:notId', notController.getNot);


module.exports=router;