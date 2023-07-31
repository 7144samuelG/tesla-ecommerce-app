import { signIn } from "next-auth/react"

export const LoginUser=async ({email,password})=>{
    console.log("helpers",email,password)
    const res=await signIn("credentials",{
        redirect:false,
        email,
        password
    })
    return res
}