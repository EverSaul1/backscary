const { Router } = require('express');
const { crearRankigs, mostarRanking, totaldeComentarioHistoria } = require('../controllers/ranking.controller');

const router = Router();

router.post('/crearRanking', crearRankigs);

router.get('/', mostarRanking);
router.get('/countComment', totaldeComentarioHistoria)

module.exports = router