const {response} = require('express');
const Ranking = require('../models/Ranking');

const crearRankigs = async(req, res= response) => {

    const {comment, like, view, favorite, usuario, dateComment} = req.body;

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
            dateComment,
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
const crearComentarioHistoria = async(req, res= response) => {
    
    const {comment, like, view, favorite, dateComment} = req.body;

    const { history} = req.query;

    try {

        const idHistory = await Ranking.find({history: history})
        console.log("hola", req.body)  

        const crearRanking = new Ranking(req.body)

        await crearRanking.save()

        console.log(crearRanking)

        return res.status(200).json({
            ok: true,
            comment,            
            like,
            view,            
            favorite,
            dateComment,
            idUsuario: crearRanking.usuario,
            idHistory: crearRankigs.history       
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
        .limit(limit*1)
        .skip((page-1)*limit);

        return res.status(200).json(           
            dbRankings
        )
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        }) 
    }

}
const mostarRankingHistoria = async(req, res= response) => {


    const { history, myHistory} = req.query;
    try {

        const count = await Ranking.count()
        
        const dbRankings = await Ranking.find({history: history},)
        .populate('usuario', {name: 1})        
        

        return res.status(200).json(           
            dbRankings
        )
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        }) 
    }

}

const totaldeComentarioHistoria = async(req, res = response) =>{

    const{history} = req.query

    try {

        const countCommentHistory = await Ranking.find({history: history}).count()

        return res.status(200).json({
            ok:true,
            countCommentHistory,

        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador'
        }) 
    }

}

const traerDatosHitoria = async(req, res = response) => {

    const {history, comment} = req.query

    try {

        const dataHistory = await Ranking.find({history: history})

        console.log(dataHistory)        

        return res.status(200).json({
            history,
            dataHistory,
            comment: comment
        }        
        )
        
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
    totaldeComentarioHistoria,
    traerDatosHitoria,
    crearComentarioHistoria,
    mostarRankingHistoria
}
