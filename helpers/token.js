const token = require('jsonwebtoken')

const generarToken = (uid, name) => {

    const payload = {uid, name};

   return new Promise((resolve, reject) =>{
 
        token.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, tokens) => {

            if( err){
                //TODO MAL
                console.log(err)
                reject(err)
            }else {
                //TODO BIEN
                resolve( tokens )
            }
        })
    });
   
}

module.exports = {
    generarToken
}