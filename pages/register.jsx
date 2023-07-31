import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import {redirect} from "next/navigation"
import { LoginUser } from "./helpers";
import { useAuth } from "@/context/authContext";
export default function register() {
  // const router = useRouter();
  // const [submitError,setSubmitError]=useState("");
  // const [loading,setLoading]=useState(false)
  // const{data:session}=useSession()
  const router=useRouter()
   const {
   register,
     handleSubmit,
     getValues,
    formState: { errors },
   } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      cpassword:""
    }
   });
  // useEffect(()=>{
  //   if(session?.user){
  //     router.push(redirect||"/");
    

  // },[router,session,redirect])
  const {user,register1}=useAuth()
  const submitHandler = async ({ username, email, password, cpassword }) => {
//
try{
  await register1(email,password)
  router.push("/")
}catch(err){
  console.log(err)
}


//
    // console.log("from form step1",username,email,password)
    // try {
    //   setLoading(true)
    //   const apiRes=await axios.post("/api/auth/signup", {
    //     username,
    //     email,
    //     password,
    //     cpassword,
    //   });
    //   console.log("data returned fom backend",apiRes.data)
    //   console.log("data returned fom backend",apiRes.data.user.email)
    //   if(apiRes.data.success){
    //     const loginRes=await LoginUser({
    //       email:apiRes.data.user.email,
    //       password:apiRes.data.user.password
    //     })
    //     if(loginRes &&!loginRes.ok){
    //       setSubmitError(loginRes.error|| "")
    //     }else{
    //       router.push("/")
    //     }
    //   }
      
    // } catch (error) {
    //   if(error instanceof AxiosError){
    //     const errorMsg=error.response?.data?.error;
    //     setSubmitError(errorMsg)
    //   }
    // }
    // setLoading(false)
  };
  return (
    <div className="wrapper mt-[80px] text-center w-full lg:w-[400px]  mx-auto py-10">
      <div>
        <Image
          src="/images/logo.svg"
          width={200}
          height={200}
          alt=""
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold">Sign up to your account</h1>
        <p>Or</p>
        <Link legacyBehavior href="/login">
          <a className="text-blue-600 hover:text-blue-300 pb-7">sign up</a>
        </Link>
        <form
          className="flex flex-col gap-5 border p-7 rounded-md mt-7"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="border rounded-xl w-full mx-auto">
            <input
              type="text" 
              name="username"
              placeholder="Name"
              {...register("username", { required: "please enter your name" })}
              className="w-full bg-slate-50 py-2 px-6 focus:outline-none border-none"
              autoFocus
            />
          </div>
          {errors.username && (
            <div className="text-rose-500">{errors.username.message}</div>
          )}
          <div className="border rounded-xl w-full mx-auto">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              {...register("email", { required: "please enter your email" })}
              className="w-full bg-slate-50 py-2 px-6 focus:outline-none border-none"
            />
            {errors.email && (
              <div className="text-rose-500">{errors.email.message}</div>
            )}
          </div>
          <div className="border rounded-xl w-full mx-auto">
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="Password"
              {...register("password", {
                required: "please enter your password",
                minLength:{value:5,message:"password is more than 5 characeters"}
              })}
              className="w-full bg-slate-50 py-2 px-6 focus:outline-none border-none"
            />
            {errors.password && (
              <div className="text-rose-500">{errors.password.message}</div>
            )}
          </div>

          <div className="border rounded-xl w-full mx-auto">
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              {...register("cpassword", {
                required: "please enter your password",
                minLength:{value:5,message:"password is more than 5 characeters"}
              })}
              className="w-full bg-slate-50 py-2 px-6 focus:outline-none border-none"
            />
          
          {errors.cpassword && (
              <div className="text-rose-500">{errors.cpassword.message}</div>
            )}
          </div>
          <div className="border rounded-xl w-full mx-auto">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500
                 hover:bg-gray-100 rounded-md py-2 text-lg text-gray-50 hover:border hover:text-gray-700"
              
            >
              Register
            </button>
          </div>
          
            {/* <div className="text-red-500">{submitError}</div> */}
          
        </form>
      </div>
    </div>
  );
}
