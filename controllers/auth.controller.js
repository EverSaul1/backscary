const {response} = require('express')
const { body, validationResult } = require('express-validator')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarToken } = require('../helpers/token')
const { updateOne } = require('../models/Usuario')

const crearUsuario = async (req, res = response) => {   

    const {name, email, password, username} = req.body

    try {

        //VERIFICAR EL EMAIL

       
        const emailUser = await Usuario.findOne({email});

         if(emailUser){
             return res.status(400).json({
                 ok: false,
                 msg: 'El usuario ya existe con ese email'
             });
         }
         //VERIFICAR EL USERNAME

        const User = await Usuario.findOne({username});

        if(User){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con este nombre'
            });
        }       
         

        // CREAR USUARIO CON EL MODELO
         const dbUsuario = new Usuario(req.body);

        //ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        dbUsuario.password = bcrypt.hashSync( password, salt );

        //GENERAR JSON WEB TOKEN

        const token = await generarToken(dbUsuario.id, dbUsuario.name)


        //CREAR USUARIO DE BASE DE DATOS

        await dbUsuario.save();

        console.log(dbUsuario)

        //GENERAR RESPUESTA
        return res.status(200).json({
            ok: true,
            uid: dbUsuario.id,
            username,
            name,  
            token    
        })
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
        
    } 
    

   
}
const editarUsuario = async (req, res) => {

    const {name, email, password} = req.body
    
    try {
        //VALIDAR SI EL EMAIL NO ESTA DUPLICADO
        const usuario1 = await Usuario.findOne({email});

         if(usuario1){
             return res.status(400).json({
                 ok: false,
                 msg: 'El usuario ya existe con ese email'
             });
         }
         // BUSCAMOS POR ID Y EDITAMOS
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body);
        console.log(usuario)


        // ACTUALIZAR USUARIO
        if(usuario){
            return res.status(200).json({
                ok: true,
                msg: 'El usuario a sido editado correctamente'
                
            })
        }
        
        
    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
        
    }
    
}

//ELIMINAR USUARIO

const eliminarUsuario = async(req, res = response) => {
    const {name, email, password} = req.body

    try {

         const usuario = await Usuario.findByIdAndDelete(req.params.id)
            console.log(usuario) 
            // VERIFICAR SI YA SE ELIMINAR EL USUARIO
            if(!usuario){

            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya ha sido eliminado'
            });
        }
            // eliminar USUARIO
            return res.status(200).json({
            ok: true,
            msg: 'El usuario a sido eliminado correctamente'
            
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }

    

}

const loginUsuario = async (req, res = response) => {   

    const { email, password, username} = req.body;

    try {

        const usuariodb = await Usuario.findOne({username});

        if(!usuariodb){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        //CONFIRMAR SI EL PASSWORD ES CORRECTO

        const validPassword = bcrypt.compareSync( password, usuariodb.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            });
        }

        //GENERAR WEB JSON TOKEN
        const token = await generarToken(usuariodb.id, usuariodb.name)

        //RESPUESTA DEL SERVICIO
        return res.json({
            ok: true,
            uid: usuariodb.id,
            name: usuariodb.name,  
            token 
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
   
}

const Revalidartoken = async(req, res = response) => {

    const {uid, name} = req;  


    //GENERAR WEB JSON TOKEN

    const token = await generarToken(uid, name)

    return res.json({
        ok: true,
        uid,
        name,
        token      
    })
}
const getDataUsuario = async(req, res = response) => {


    try {
        
        const bdUsuario = await Usuario.find()

        return res.status(200).json({
            data: bdUsuario

        })

        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "contacte con el admin"
        })
    }

}

module.exports = {
    crearUsuario,
    loginUsuario,
    Revalidartoken,
    editarUsuario,
    eliminarUsuario,
    getDataUsuario
}