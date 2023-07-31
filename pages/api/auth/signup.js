import { connectToMongo } from "@/database/connect"
import User from "@/models/Schema";
import { hash } from "bcryptjs";
import mongoose from "mongoose";
const handler=async(req,res)=>{
  connectToMongo().catch(err=>res.json(err));
  if(req.method==="POST"){
    if(!req.body)return res.status(400).json({error:"Data is Missing"});
    const{username,email,password}=req.body;
    console.log("signup step2",req.body)
    const userExist=await User.findOne({email});
    if(userExist){
      return res.status(409).json({error:"user already exist"})
    }
   
    else{
      const hashedPassword=await hash(password,12);
      User.create({
        username, 
        email,
        password:hashedPassword
      }
      ).then((data)=>{
        console.log("created data step3 signup",data)
        const user={
          email:data.email,
          username:data.username,
          password:data.password,
          _id:data._id
        }
        console.log("user data signup",user)
        return res.send({
          success:true,
          user
        })
      })
    }
  }
  else{
    res.status(405).json({error:"Method Not Allowed"})
  }
}
export default handler