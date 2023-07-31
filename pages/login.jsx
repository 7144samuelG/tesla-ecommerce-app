import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Form.module.css";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/authContext";
export default function register() {
  
  const router = useRouter();

  const {user,login,googleLogin}=useAuth()
  const {
    register,
      handleSubmit,
      getValues,
     formState: { errors },
    } = useForm({
     defaultValues: {
       email: '',
       password: '',
     }
    });
  const submitHandler=async({email, password})=>{
    try{
      await login(email,password)
      router.push("/")
    }catch(err){
      console.log(err)
    }
   }
    const handleGoogleSign=async(e)=>{
       e.preventDefault();
      await googleLogin()
      router.push("/")
     }
  return (
    <div className="wrapper mt-[80px] text-center w-full lg:w-[400px] border mx-auto py-10 rounded-md">
      <div>
        <Image
          src="/images/logo.svg"
          width={200}
          height={200}
          alt=""
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p>Or</p>
        <Link legacyBehavior href="/register">
          <a className="text-blue-600 hover:text-blue-300">
            create new account
          </a>
        </Link>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(submitHandler)}>
          <div className="border rounded-xl w-3/4 mx-auto">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              {...register("email",{
                required:"please enter email",
                
              })}
              autoFocus
              className="w-full bg-slate-50 py-4 px-6 focus:outline-none border-none"
            />
            {errors.email &&(
              <div className="text-rose-500">{errors.email.message}</div>
            )}
          </div>
          
          <div className="border rounded-xl w-3/4 mx-auto">
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="Password"
              {...register("password",{
                required:"please enter email",
                minLength:{value:5,
                message:"password is more than 5 characters"}
                
              })}
              className="w-full bg-slate-50 py-4 px-6 focus:outline-none border-none"
            />
            {errors.password &&(
              <div className="text-rose-500">{errors.password.message}</div>
            )}
          </div>
          
          <div className="border rounded-xl w-3/4 mx-auto">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500
                 hover:bg-gray-100 rounded-md py-3 text-lg text-gray-50 hover:border hover:text-gray-700"
            
            >
              submit
            </button>
          </div>
          <div className="border rounded-xl w-3/4 mx-auto">
            <button
              type="button"
              onClick={handleGoogleSign}
              className={styles.button_custom}
            >
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
