const { Router } = require('express');
const { crearRankigs, mostarRanking, totaldeComentarioHistoria, traerDatosHitoria, crearComentarioHistoria, mostarRankingHistoria } = require('../controllers/ranking.controller');

const router = Router();

router.post('/crearRanking', crearRankigs);
router.post('/commentHistory', crearComentarioHistoria);


router.get('/', mostarRanking);
router.get('/getComment', mostarRankingHistoria);

router.get('/countComment', totaldeComentarioHistoria);
router.get('/dataHistory', traerDatosHitoria);

module.exports = router