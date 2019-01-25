'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PeripheralDevice = new Schema({
    uid: {type:Number, unique: true, required: true},
    vendor: {type:String, required: true},
    date_created: {type: Date,default: Date.now},    
    status:{type:String, enum: ['online','offline']}, //could be a boolean
  });

  module.exports = mongoose.model('PeripheralDevice', PeripheralDevice);