const {Schema, model} = require('mongoose');

const CategorySchema = Schema({

    nameCategory: {
        type: String,
        require: true,
    },
    decriptionCategory: {
        type: String,
        
    },
    imageCategory:{
        type: String,
        require: true
    }

    

});
module.exports = model('Category', CategorySchema);