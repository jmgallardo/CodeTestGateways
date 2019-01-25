'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db,{useCreateIndex: true, useNewUrlParser: true },(err,res)=> {
    if(err)
        return console.log(`Error occurred trying to connect to the database:${err}`)
    console.log('Connected to the Database...')

    app.listen(config.port ,() => {
        console.log(`App Gateways Code Exercise is running on localhost:${config.port}`)
    })

})

