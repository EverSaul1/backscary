const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarMyHistoria, eliminarMyHistoria, editarMyHistoria, crearMyHistoria } = require('../controllers/myHistory.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/createMyHistory', [
    check('nameMyHistory', 'La nombre de la historia es obligatorio').not().isEmpty(),
    check('descriptionMyHistory', 'La descripcion es obligatorio').not().isEmpty(),
    check('myhistory', 'La historia es obligatorio').not().isEmpty(),
    check('dateMyHistory', 'La fecha es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
],validarCampos,crearMyHistoria)

//EDITAR HISTORIA

router.post('/editMyHistory/:id', [
    check('nameMyHistory', 'La nombre de la historia es obligatorio').not().isEmpty(),
    check('descriptionMyHistory', 'La descripcion es obligatorio').not().isEmpty(),
    check('myhistory', 'La historia es obligatorio').not().isEmpty(),
    check('dateMyHistory', 'La fecha es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
],validarCampos, editarMyHistoria)

//ELIMINAR HISTORIA
router.delete('/deleteMyHistory/:id', eliminarMyHistoria)

//MOSTRAR HISTORIA
router.get('/', mostrarMyHistoria)

module.exports = router