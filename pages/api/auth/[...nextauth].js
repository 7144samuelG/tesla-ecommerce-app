import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongo } from "@/database/connect";
import User from "@/models/Schema";
import { compare } from "bcryptjs";
const options={
  providers:[
    GoogleProvider(
      {
        clientId:process.env.GOOGLE_ID,
        clientSecret:process.env.GOOGLE_SECRET

      }
    ),
    CredentialsProvider({
      id:"credentials",
      name:"Credentials",
      credentials:{
        email:{label:"Email",type:"text"},
        password:{label:"Password",type:"password"}
      },
      async authorize(credentials){
        await connectToMongo().catch(err=>{throw new Error(err)});
        console.log("crede",credentials.password)
        const user=await User.findOne({
          email:credentials?.email
        }).select("+password") 
        console.log("loginpass",user.password)
        if(!user){
          throw new Error("invalid credentials")
        }
        const isPasswordCorrect=await compare(credentials.password,user.password);
        console.log("pass",isPasswordCorrect)
        // if(!isPasswordCorrect){
        //   throw new Error("invalid credentials password")
        // }
      }
    })
  ],
  pages:{
    signIn:"/login"
  },
  session:{
    strategy:"jwt"
  },
  callback:{
    jwt:async({token,user})=>{
      user &&(token.user=user)
      return token
    },
    session:async({session,token})=>{
      const user=token.user=token.user
      session.user=user
      return session
    }
  }
 
}
export default NextAuth(options)