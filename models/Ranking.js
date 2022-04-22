const {Schema, model} = require('mongoose');

const RankingSchema = Schema({

    comment: {
        type: String,
        require: true,
    },
    like: {
        type: Boolean,
        require: true
        
    },
    dateComment: {
        type: Date,
        require: true
    },
    view: {
        type: Boolean,
    },  
    
    favorite: {
        type: Boolean,
    },

    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    history: {type: Schema.Types.ObjectId, ref: 'History'},
    myHistory: {type: Schema.Types.ObjectId, ref: 'MyHistory'},

});
module.exports = model('Ranking', RankingSchema);