import express, { Request, Response } from "express";
import { verifyToken } from "../controllers/verifyToken";
import { deviceModel } from "../config/deviceModels";
import {  Sensor } from "../models/Sensor";


const router = express.Router();

router.get('/machines', verifyToken, async ({query: {last,place}}, res) => {
    const {id} = res.locals.payload as {id: string};
    try {
        let deviceFound = await deviceModel.findOne({"idUser": id})
        if (!deviceFound) return res.status(404).json({message: "Device NOT Found!"});
        if (last) deviceFound = deviceFound.sensors.map(({id,machine,data}:Sensor) => ({machine,id,data: [data.at(-1)]}));
        if(place) deviceFound=(Array.isArray(deviceFound) ? deviceFound : deviceFound.sensors).filter((sensor:Sensor)=>sensor.machine.typology===place)
        return res.status(200).json({message: 'ok', payload: deviceFound});
    }
    catch (error) {
        console.log(error)
    }
});

router.post('/add-device',verifyToken,async({body:{idDevice,sensors}}:Request,res:Response)=>{
    const {id} = res.locals.payload as {id: string};
    try {
        const newDevice=new deviceModel({
           idDevice:idDevice,
           idUser:id,
           sensors:[
               ...sensors
           ]
        })
        await newDevice.save()
        res.status(200).json({message:'ok'})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:'errore'})
        
    }

})


export default router;