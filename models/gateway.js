'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator');

const peripheralDevice = require('../models/peripheralDevice')


let gateway = new Schema({
    serNr: {type:String, unique: true, required: true},
    name: String,
    ipAddress: {type:String, 
      validate: (value) => {
        return validator.isIP(value);
      }
    },
    peripheralDevices : [{ type: Schema.Types.ObjectId, ref: 'PeripheralDevice' }],
  });
  module.exports = mongoose.model('Gateway', gateway);

