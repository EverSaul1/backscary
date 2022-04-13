const {response} = require('express');
const Category = require('../models/Category');
const History = require('../models/History');

const crearHistoria = async(req, res = response) => {

    const {nameHistory, descriptionHistory, history, dateHistory, linkHistory, imagesHistory, category} = req.body

    try {

        const historyBD = new History(req.body);

        await historyBD.save()

        return res.status(200).json({
            ok: true,
            nameHistory,
            descriptionHistory,
            history,
            dateHistory,
            linkHistory,
            imagesHistory,            
            idCategoria: historyBD.category
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
}

const editarHistoria = async(req, res = response) => {

    const {nameHistory, descriptionHistory, history, dateHistory, linkHistory, imagesHistory, category} = req.body

    try {

       const historiBD = await History.findByIdAndUpdate(req.params.id, req.body);

        console.log(historiBD)


            return res.status(200).json({
                ok: true,
                msg: 'Historia editada',
                nameHistory,
                descriptionHistory,
                history,
                dateHistory,
                linkHistory,
                imagesHistory,                
                category
            })
                
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }

}
const eliminarHistoria = async(req, res = response) =>{

    try {
        await History.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            ok: true,
            msg: 'Historia eliminada'
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
    
}

const mostrarHistoria = async(req, res = response) => {

    try {

        const historyBD = await History.find(req.body).populate('category', {nameCategory:1});

        return res.status(200).json({
            data: historyBD
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
}

const historiasEnCategoria = async(req, res = response) => {

         const{category, nameHistory} = req.query;

    try {

        const categoryID = await History.find({category: category})
        .populate('category', {nameCategory: 1})
        .find({nameHistory: {$regex: nameHistory}});
        //const nameHistoria = await History.find({nameHistory: {$regex: nameHistory}})
        console.log(req.query)


        return res.status(200).json(
            categoryID
        )           
       

        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
        
    }


}
module.exports = {
    crearHistoria,
    editarHistoria,
    eliminarHistoria,
    mostrarHistoria,
    historiasEnCategoria
}