const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connect successfully');
    }
    catch(err){ 
        throw new Error(err.message)
    }

}
module.exports = {connect};
