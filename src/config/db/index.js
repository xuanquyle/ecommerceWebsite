const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
        console.log('Connect successfully');
    }
    catch(err){ 
        console.log('Error connecting to database');
    }

}
module.exports = {connect};