const {response} = require('express');
const req = require('express/lib/request');
const Category = require('../models/Category');


const crearCategory = async(req, res = response) => {

    const {nameCategory, descriptionCategory, imageCategory} = req.body;

    try {

         //VALIDACION
         const validarNameCategory = await Category.findOne({nameCategory})

         if(validarNameCategory){
             return res.status(400).json({
                 ok: false,
                 msg: 'La categoria ya existe'
             })
         }

        const categoryBD = new Category(req.body);

        await categoryBD.save()

        return res.status(200).json({
            ok: true,
            nameCategory,
            descriptionCategory,
            imageCategory
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
}

const editarCategoria = async(req, res = response) => {

    const {nameCategory, descriptionCategory, imageCategory} = req.body;

    try {

        //VALIDACION
        const validarNameCategory = await Category.findOne({nameCategory})

        if(validarNameCategory){
            return res.status(400).json({
                ok: false,
                msg: 'La categoria ya existe'
            })
        }

        const editCategoryBD = await Category.findByIdAndUpdate(req.params.id, req.body)

        
            return res.status(200).json({
                ok: true,
                msg: 'La categoria ha sido editado correctamente',
                nameCategory,
                descriptionCategory
            })
        
        
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
}

const eliminarCategoria = async(req, res = response) =>{

    try {

        await Category.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            ok: true,
            msg: 'Categoria eliminada'
        })

        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }

}

const mostrarCategorias = async(req, res = response) => {

    try {
        
        const mostarCategoryBD = await Category.find()

        return res.status(200).json(
            mostarCategoryBD
        
            
        )

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
}



module.exports = {
    crearCategory,
    editarCategoria,
    eliminarCategoria,
    mostrarCategorias
}