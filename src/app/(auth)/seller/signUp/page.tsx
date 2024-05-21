"use client";

import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { toastCompactTheme } from "../../../../../Default/toast";
import { API_Auth_Buyer_SignUp } from "../../../../../helper/API/auth/buyer_signup";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const HandleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData(e.target as HTMLFormElement);
      let email = data.get("email");
      let password = data.get("password");
      let password2 = data.get("password2");
      let first_name = data.get("first_name");
      let last_name = data.get("last_name");
      let mobile = data.get("mobile");
      if (!email || !password || !first_name || !last_name || !mobile || !password2)
        return toast.error("All fields are required", toastCompactTheme);

      email = email.toString();
      password = password.toString();
      password2 = password2.toString();
      last_name = last_name.toString();
      first_name = first_name.toString();
      mobile = mobile.toString();

      const promise = new Promise(async (resolve, reject) => {
        const response = await API_Auth_Buyer_SignUp({
          email,
          password,
          password2:password2,
          f_name:first_name,
          l_name:last_name,
          phone_no: mobile,
          user_type: 1
        });

        if (response.error && response.message) {
          reject(response.message);
        } else {
          resolve(1);
        }
      });

      toast
          .promise(
              promise,
              {
                pending: "Signing Up ...",
                success: "Signed Up",
              },
              toastCompactTheme,
          )
          .then(() => {
            setTimeout(()=>{location.href = "/auth";},1000)
          })
          .catch((reason: string[]) => {
            for (let msg of reason) toast.error(msg, toastCompactTheme);
          });
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className={`w-full flex h-screen flex-row-reverse`}>
        <div className={`w-full flex justify-center items-center bg-gray-50 p-4`}>
          <form
              onSubmit={HandleSignUp}
              className={`flex flex-col justify-center max-w-[400px] w-full min-w-[300px] rounded-lg shadow-lg shadow-blue-100 bg-white gap-2 p-8`}
          >
            <div className={`text-center flex flex-col gap-2 font-semibold`}>
              <span className={`text-4xl`}>Sign Up</span>
              <span className={``}>Fill the required credentials</span>
            </div>

            <div className={`w-full flex flex-col`}>
              <span className={`text-sm text-gray-500`}>First Name</span>
              <input
                  type={"text"}
                  name={`first_name`}
                  className={`bg-gray-100 outline-0 py-1 rounded-md px-2`}
                  placeholder={`John`}
              />
            </div>

            <div className={`w-full flex flex-col`}>
              <span className={`text-sm text-gray-500`}>Last Name</span>
              <input
                  type={"text"}
                  name={`last_name`}
                  className={`bg-gray-100 outline-0 py-1 rounded-md px-2`}
                  placeholder={`Doe`}
              />
            </div>

            <div className={`w-full flex flex-col`}>
              <span className={`text-sm text-gray-500`}>Phone No.</span>
              <input
                  type={"tel"}
                  name={`mobile`}
                  className={`bg-gray-100 outline-0 py-1 rounded-md px-2`}
                  placeholder={`+91XXXXXXXXXX`}
              />
            </div>

            <div className={`w-full flex flex-col`}>
              <span className={`text-sm text-gray-500`}>Email</span>
              <input
                  name={`email`}
                  className={`bg-gray-100 outline-0 py-1 rounded-md px-2`}
                  placeholder={`test@example.com`}
              />
            </div>

            <div className={`w-full flex flex-col`}>
              <span className={`text-sm text-gray-500`}>Password</span>
              <input
                  type={"password"}
                  name={`password`}
                  className={`bg-gray-100 outline-0 py-1 rounded-md px-2`}
                  placeholder={`******`}
              />
            </div>

            <div className={`w-full flex flex-col`}>
              <span className={`text-sm text-gray-500`}>Retype password</span>
              <input
                  type={"password"}
                  name={`password2`}
                  className={`bg-gray-100 outline-0 py-1 rounded-md px-2`}
                  placeholder={`******`}
              />
            </div>

            <Button
                type={"submit"}
                variant={"solid"}
                size={"sm"}
                color={"primary"}
                isLoading={isSubmitting}
            >
              Sign Up
            </Button>

            <div className={`flex gap-1 justify-center text-xs items-center`}>
              <span>Already a customer</span>
              <Link href={"/auth"} className={`font-semibold text-primary`}>
                SignIn
              </Link>
            </div>
          </form>
        </div>

        <div
            className={`w-full signInGrad hidden justify-center items-center lg:flex`}
        >
          <div
              className={`flex flex-col justify-center max-w-[350px] text-center text-white font-semibold gap-2`}
          >
            <span className={`text-4xl`}>Welcome Seller</span>
            <span className={`text-lg`}>
            Simply fill the required details to get started
          </span>
          </div>
        </div>
      </div>
  );
};

export default Page;
