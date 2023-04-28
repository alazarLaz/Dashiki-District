const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://alazar:alazar123@cluster0.veje7hl.mongodb.net/dishiki?retryWrites=true&w=majority')
// mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.on('connected', ()=>{
    console.log('Mongodb Connection Successful')
})

connection.on('error', (err)=>{
    console.log('Mongodb Connection Failed!!')
})

module.exports = connection;