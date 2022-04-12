import { Schema, model } from 'mongoose';

const dataSchema=new Schema({
    value:Number,
    timestamp:{type:Number,unique:true,required:true},
    
},{_id:false})

const rangeSchema=new Schema({
    minValue:{type:Number,default:0},
    maxValue:{type:Number,default:0}
},{_id:false})


const deviceSchema = new Schema({
    idDevice:String,
    idUser:String,
    sensors:[{
        _id:false,
        id:String,
        machine:{
            id:String,
            typology:String,
            status:String,
            range:rangeSchema
        },
        typology:String,
        data:[
            dataSchema
        ]
    }]
})

export const deviceModel = model('devices',deviceSchema)

