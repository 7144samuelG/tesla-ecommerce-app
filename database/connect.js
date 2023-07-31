// import mongoose from 'mongoose';
// const connection={}
// async function connect(){
//     if(connection.isConnected){
//         console.log('already connected');
//         return;
//     }
//     if(mongoose.connections.length>0){
//         connection.isConnected=mongoose.connections[0].readyState;
//         if(connection.isConnected===1){
//             console.log('use previous connection');
//             return
//         }
//         await mongoose.disconnect();
//     }
//     const db=await mongoose.connect(process.env.MONGO_URL)
//     console.log('new connection');
//     connection.isConnected=mongoose.connections[0].readyState;
// }
// async function disconnect(){
//     if(connection.isConnected){
//         if(process.env.NODE_ENV==="production"){
//             await mongoose.disconnect();
//             connection.isConnected=false
//         }
//         else{
//             console.log('not disconnected')
//         }
//     }
// }
// const db={connect,disconnect};
// export default db;
import mongoose from "mongoose"
const MONGO_URL=process.env.MONGO_URL;
if(!MONGO_URL){
    throw new Error("invalide environment credentials")
}
export const connectToMongo=async()=>{
    try{
        const {connection}=await mongoose.connect(MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        if(connection.readyState===1){
            return Promise.resolve(true)
        }
    }catch(err){
        Promise.reject(err)
    }
}