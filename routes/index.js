'use strict'

const express = require('express')

const gateway = require('../controllers/gatewayController')
const device = require('../controllers/peripheralDeviceController')

const api = express.Router()


// Gateways
api.get('/gateway',gateway.getGateways)//ok

api.get('/gateway/:gatewayId',gateway.getGateway)//ok

api.post('/gateway', gateway.saveGateway)//ok

api.put('/gateway/:gatewayId',gateway.updateGateway)

api.put('/gateway/addDevice/:gatewayId/:deviceId',gateway.addGatewayDevice) //ok

api.put('/gateway/removeDevice/:gatewayId/:deviceId',gateway.removeGatewayDevice) //ok

api.delete('/gateway/:gatewayId',gateway.deleteGateway)//ok

// Peripheral Devices
api.get('/device',device.getPeripheralDevices)//ok

api.get('/device/:deviceId',device.getPeripheralDevice)//ok

api.post('/device',device.savePeripheralDevice)//ok

api.put('/device/:deviceId',device.updatePeripheralDevice)

api.delete('/device/:deviceId',device.deletePeripheralDevice)//ok

module.exports = api