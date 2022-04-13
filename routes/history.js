const { Router } = require('express');
const { check } = require('express-validator');
const { crearHistoria, editarHistoria, eliminarHistoria, mostrarHistoria, historiasEnCategoria} = require('../controllers/history.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//CREAR HISTORIA

router.post('/createHistory', [
    check('nameHistory', 'La nombre de la historia es obligatorio').not().isEmpty(),
    check('descriptionHistory', 'La descripcion es obligatorio').not().isEmpty(),
    check('history', 'La historia es obligatorio').not().isEmpty(),
    check('dateHistory', 'La fecha es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
],validarCampos,crearHistoria)

//EDITAR HISTORIA

router.post('/editHistory/:id', [
    check('nameHistory', 'La nombre de la historia es obligatorio').not().isEmpty(),
    check('descriptionHistory', 'La descripcion es obligatorio').not().isEmpty(),
    check('history', 'La historia es obligatorio').not().isEmpty(),
    check('dateHistory', 'La fecha es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
],validarCampos, editarHistoria)

//ELIMINAR HISTORIA
router.delete('/deleteHistory/:id', eliminarHistoria)

//MOSTRAR HISTORIA
router.get('/', mostrarHistoria)

//MOSTRAR HISTORIA con categoria
router.get('/show', historiasEnCategoria)

module.exports = router