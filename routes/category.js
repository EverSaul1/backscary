const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategory, editarCategoria, eliminarCategoria, mostrarCategorias } = require('../controllers/category.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//CREAR CATEGORIA

router.post('/createCategory',[
    check('nameCategory', 'La categoria es obligatorio').not().isEmpty(),
    check('imageCategory', 'La imagen es obligatorio').not().isEmpty(),
], validarCampos,crearCategory)

//EDITAR CATEGORIA

router.post('/editCategory/:id', [
    check('nameCategory', 'La categoria es obligatorio').not().isEmpty(),
],validarCampos,editarCategoria)

//ELIMINAR CATEGORIA

router.delete('/deleteCategory/:id', eliminarCategoria)


//MOSTAR CATEGORIAS

router.get('/', mostrarCategorias)

module.exports = router