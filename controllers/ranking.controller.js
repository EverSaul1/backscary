const {response} = require('express');
const Ranking = require('../models/Ranking');

const crearRankigs = async(req, res= response) => {

    const {comment, like, view, favorite, usuario} = req.body;

    const { history, myHistory} = req.query;

    try {

        const idHistory = await Ranking.find({myHistory: myHistory})
        console.log(idHistory)  

        const crearRanking = new Ranking(req.body)

        await crearRanking.save()

        console.log(crearRanking)

        return res.status(200).json({
            ok: true,
            comment,
            like,
            view,
            favorite,
            idUsuario: crearRanking.usuario,
            idMyHistory: crearRanking.myHistory
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        })
    }
}

const mostarRanking = async(req, res= response) => {


    const { history, myHistory, page = 1, limit = 10} = req.query;
    try {

        const count = await Ranking.count()
        
        const dbRankings = await Ranking.find({myHistory: myHistory},)
        .populate('usuario', {name: 1})
        .populate('myHistory')
        .limit(limit*1)
        .skip((page-1)*limit);

        return res.status(200).json({
            ok: true,
            count,
            data: dbRankings
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        }) 
    }

}

const totaldeComentarioHistoria = async(req, res = response) =>{

    const{myHistory} = req.query

    try {

        const countCommentHistory = await Ranking.find({myHistory: myHistory}).count() 

        return res.status(200).json({
            ok:true,
            countCommentHistory

        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        }) 
    }

}



module.exports = {
    crearRankigs,
    mostarRanking,
    totaldeComentarioHistoria
}
