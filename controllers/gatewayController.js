
const gateway = require('../models/gateway')
const peripheralDevice = require('../models/peripheralDevice')



async function getGateway(req,res){ // A gateways with devices Details
    let gatewayId = req.params.gatewayId
    
    let gatewayObject = await gateway.findById(gatewayId,(err,gateway) =>{
        if(!err) 
            return gateway
        else
         return null
    })      

    if(gatewayObject){
        let g = {}
        g._id = gatewayObject._id
        g.serNr = gatewayObject.serNr
        g.name = gatewayObject.name
        g.ipAddress = gatewayObject.ipAddress
        g.peripheralDevicesDetails = []

        if(gatewayObject.peripheralDevices){
            for (let id of gatewayObject.peripheralDevices){
                
                let device = await peripheralDevice.findOne({ _id:id }).exec()                   

                g.peripheralDevicesDetails.push(device)

            }
        }
        return res.status(200).send({gateway:g})
    }
    else 
       return res.status(500).send({message: `Gateway: ${gatewayId} not found`})

}
  

async function getGateways(req,res){ //Alls gateways with devices Details

    let gateways =  await gateway.find({},(err,response)=>{        
            if(!err)
                return response
            else 
                return null
      })  
      
      let gatewaysDetails=[]
      for(let g of gateways) {
            let gatewayObject = {}
            gatewayObject._id = g._id
            gatewayObject.serNr = g.serNr
            gatewayObject.name = g.name
            gatewayObject.ipAddress = g.ipAddress
            gatewayObject.peripheralDevicesDetails = []

            if(g.peripheralDevices){
                for (let id of g.peripheralDevices){
                    
                    let device = await peripheralDevice.findOne({ _id:id }).exec()                   

                    gatewayObject.peripheralDevicesDetails.push(device)

                }
            }
            gatewaysDetails.push(gatewayObject)
        }
        if(gateways)
            return res.status(200).send({gatewaysDetails})
      
}

function  saveGateway(req,res){  

    let newGateway = new gateway()

    newGateway.serNr= req.body.serNr;
    newGateway.name= req.body.name;
    newGateway.ipAddress = req.body.ipAddress;  
  
    newGateway.save((err,gatewayStored) => {
        if (err)
         return res.status(500).send({message:`error occurred while saving gateway:${err}`})
        else 
         return res.status(200).send({gateway:gatewayStored})
    })
}


function updateGateway(req,res){

}

function deleteGateway(req,res){

    let gatewayId = req.params.gatewayId
    gateway.findById(gatewayId,(err,gateway) =>{
        if(err) 
            return res.status(500).send({message: `Gateway: ${gatewayId} not found`})
        else{   
            gateway.remove(err => {
            if(err) 
                return res.status(500).send({message:`Deleting error:${err}`})
            else
                return res.status(200).send({message:'Gateway removed'})
             })
        }
    })

}

async function addGatewayDevice(req,res){
    let gatewayId = req.params.gatewayId
    let deviceId = req.params.deviceId

    let gatewayObject = await gateway.findById(gatewayId,(err,gateway) =>{
        if(!err) 
            return gateway
        else
         return null
    })

    let deviceObject = await peripheralDevice.findById(deviceId,(err,device) =>{
        if(!err) 
            return device
         else
           return null

    }) 

   if(gatewayObject){
       if(gatewayObject.peripheralDevices.length < 10){
            if(deviceObject){
                if (gatewayObject.peripheralDevices.findIndex(x => x == deviceId) !== -1)
                   return res.status(500).send({message:`Device: ${deviceId} exists at the gateway`})
                else{ 
                    gatewayObject.peripheralDevices.push(deviceObject)
                    gatewayObject.save((err,gatewayStored) => {
                        if (err)
                        return res.status(500).send({message:`error occurred while saving gateway:${err}`})
                        else 
                        return res.status(200).send({gateway:gatewayStored})         
                    })
                }  
            }
            else  return res.status(500).send({message:`Device: ${deviceId} not found`})
        }    
        else  return res.status(500).send({message:'Only 10 devices allowed per gateway'})
   }
   else  return res.status(500).send({message:`Gateway: ${gatewayId} not found`})   
   
}

async function removeGatewayDevice(req,res){
    let gatewayId = req.params.gatewayId
    let deviceId = req.params.deviceId

    let gatewayObject = await gateway.findById(gatewayId,(err,gateway) =>{
        if(!err) 
            return gateway
        else
         return null
    })   

   if(gatewayObject){
        if (gatewayObject.peripheralDevices.findIndex(x => x == deviceId) !== -1){
            gatewayObject.peripheralDevices.splice(gatewayObject.peripheralDevices.findIndex(x => x == deviceId), 1);
            gatewayObject.save((err,gatewayStored) => {
                if (err)
                   return res.status(500).send({message:`error occurred while saving gateway:${err}`})
                else 
                   return res.status(200).send({gateway:gatewayStored})         
            })       
       }
       else  return res.status(500).send({message:`Device: ${deviceId} doesn't exists at the gateway`})   

    }
   else  return res.status(500).send({message:`Gateway: ${gatewayId} not found`})   
   
}

module.exports = {getGateway,getGateways,saveGateway,updateGateway,deleteGateway,addGatewayDevice,removeGatewayDevice}




