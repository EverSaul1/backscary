const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, Revalidartoken, editarUsuario, eliminarUsuario, getDataUsuario } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-token');

const router = Router();

// CREAR USUARIO
router.post('/usuario',[
    check('username', 'El name es obligatorio').not().isEmpty(),
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 8}),
    validarCampos
] ,crearUsuario)

//EDITAR USUARIO
router.post('/editar-usuario/:id',[
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener un minimo de 8 caracteres').isLength({min: 8}),
    validarCampos
], editarUsuario);

//ELIMINAR USUARIO
router.delete('/eliminar-usuario/:id', eliminarUsuario)

//LOGIN DE USUARIO
router.post('/', loginUsuario)

//VALIDAR TOKEN
router.get('/token', validarToken, Revalidartoken);
//GET DATA

router.get('/getData', getDataUsuario);


module.exports = router;



