import mongoose from 'mongoose'
import { DB_PATH } from '../../environment/environment';

export const dbConnect=()=>mongoose.connect(DB_PATH)
.then(()=>console.log('>_\x1b[32m',"MongoDB connected", '\x1b[0m'))
.catch(err=>console.log(err))

export const dbDisconnect=()=>mongoose.disconnect()
.then(()=>console.log('>_\x1b[33m', "MongoDB disconnected", '\x1b[0m'))
.catch((err)=>console.log(err))