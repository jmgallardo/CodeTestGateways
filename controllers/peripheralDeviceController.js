
const peripheralDevice = require('../models/peripheralDevice')

function getPeripheralDevice(req,res){
    let deviceId = req.params.deviceId
    peripheralDevice.findById(deviceId,(err,device) =>{
        if(err) 
            return res.status(500).send({message: `Device: ${deviceId} not found`})
        else 
           
                return res.status(200).send({device})
             })
}

function getPeripheralDevices(req,res){
    peripheralDevice.find({}).then(r=>{
        res.json(r);    
      })     
}

function savePeripheralDevice(req,res){
   
    let device = new peripheralDevice()
    
    device.uid= req.body.uid;
    device.vendor= req.body.vendor;
    device.status = req.body.status;

    device.save((err,deviceStored) => {
        if (err)
         return res.status(500).send({message:`error occurred while saving device:${err}`})
        else 
         return res.status(200).send({device:deviceStored})
    })
}

function updatePeripheralDevice(req,res){
      let deviceId = req.params.deviceId
    let update = req.body
       
    peripheralDevice.findOneAndUpdate({_id:deviceId},update,{new: true},(err,deviceUpdate) =>{
        if(err) return res.status(500).send({message:`Error occurred while updating:${err}`})
        else
          return res.status(200).send({device:deviceUpdate})
    })

}

function deletePeripheralDevice(req,res){
    let deviceId = req.params.deviceId
    peripheralDevice.findById(deviceId,(err,device) =>{
        if(err) 
            return res.status(500).send({message: `Device: ${deviceId} not found`})
        else{   
        device.remove(err => {
            if(err) 
                return res.status(500).send({message:`Deleting error:${err}`})
            else
                return res.status(200).send({message:'Device removed'})
             })
        }
    })
}


module.exports = {getPeripheralDevice,getPeripheralDevices,savePeripheralDevice,updatePeripheralDevice,deletePeripheralDevice}