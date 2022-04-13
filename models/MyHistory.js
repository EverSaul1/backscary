const {Schema, model} = require('mongoose');


const MyHistorySchema = Schema({

    nameMyHistory: {
        type: String,
        require: true,
    },
    descriptionMyHistory: {
        type: String,
        require: true        
    },

    myHistory: {
        type: String,
        require: true,
    },

    dateMyHistory: {
        type: Date        
    }, 

    linkMyHistory: {
        type: String
    },

    imagesMyHistory: {
        type: String
    },

    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    usuarioC: {type: Schema.Types.ObjectId, ref: 'Usuario'}

})

module.exports = model('MyHistory', MyHistorySchema)