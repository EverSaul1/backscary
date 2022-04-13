const {Schema, model} = require('mongoose');


const HistorySchema = Schema({

    nameHistory: {
        type: String,
        require: true,
    },
    descriptionHistory: {
        type: String,
        require: true        
    },

    history: {
        type: String,
        require: true,
    },

    dateHistory: {
        type: Date        
    }, 

    linkHistory: {
        type: String
    },

    imagesHistory: {
        type: String
    },  

    category: { type: Schema.Types.ObjectId, ref: 'Category'}

})

module.exports = model('History', HistorySchema)