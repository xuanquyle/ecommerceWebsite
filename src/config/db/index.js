const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connect successfully');
    }
    catch(err){ 
        console.log('Error connecting to database');
    }

}
module.exports = {connect};