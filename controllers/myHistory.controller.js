const {response} = require('express');
const MyHistory = require('../models/MyHistory');

const crearMyHistoria = async(req, res = response) => {

    const {nameMyHistory, descriptionMyHistory, myhistory, dateMyHistory, linkMyHistory, imagesMyHistory, category} = req.body

    try {

        const historyBD = new MyHistory(req.body);

        await historyBD.save()

        return res.status(200).json({
            ok: true,
            nameMyHistory,
            descriptionMyHistory,
            myhistory,
            dateMyHistory,
            linkMyHistory,
            imagesMyHistory,            
            idCategoria: historyBD.category,
            idUsuario: historyBD.usuarioC
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
}

const editarMyHistoria = async(req, res = response) => {

    const {nameMyHistory, descriptionMyHistory, myhistory, dateMyHistory, linkMyHistory, imagesMyHistory, category} = req.body

    try {

       const historiBD = await MyHistory.findByIdAndUpdate(req.params.id, req.body);

        console.log(historiBD)


            return res.status(200).json({
                ok: true,
                msg: 'Historia editada',
                nameMyHistory,
                descriptionMyHistory,
                myhistory,
                dateMyHistory,
                linkMyHistory,
                imagesMyHistory,                
                category
            })
                
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }

}
const eliminarMyHistoria = async(req, res = response) =>{

    try {
        await MyHistory.findByIdAndDelete(req.params.id);

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

const mostrarMyHistoria = async(req, res = response) => {
    
    const {nameMyHistory, page = 1 , limit = 10} = req.query

    try {

        const historyBD = await MyHistory
        .find({nameMyHistory: {$regex: nameMyHistory}})
        .populate('category', {nameCategory:1}).populate('usuarioC', {name:1})
        .limit(limit*1)
        .skip((page-1)* limit);
        const count = await MyHistory.count(req.params.id)

        return res.status(200).json({
            Total: count,
            data: historyBD
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
}
module.exports = {
    crearMyHistoria,
    editarMyHistoria,
    eliminarMyHistoria,
    mostrarMyHistoria
}