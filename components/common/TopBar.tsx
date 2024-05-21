"use client"

import React from 'react';
import {toast} from "react-toastify";
import {toastCompactTheme} from "../../Default/toast";
import {DeleteToken} from "../../helper/Token/jwt";

interface Props{
    name:string
}

const TopBar = (prop: Props) => {

    const HandleSignOut = async () =>{
        const promise = new Promise(async (resolve, reject) => {
            const response = await DeleteToken();
            location.href = "/"
        });

        toast
            .promise(
                promise,
                {
                    pending: "Signing Out ...",
                    success: "Signed Out",
                },
                toastCompactTheme,
            ).then(()=>{location.href = "/auth"})
            .catch((reason: string[]) => {
                for (let msg of reason) toast.error(msg, toastCompactTheme);
            });
    }

  return (
    <div className={`flex bg-gray-50 justify-end px-2 py-1 text-sm border-b-2 gap-2`}>
      <span
        className={`p-1 px-2 rounded-lg bg-secondary-100 `}
      >
        {prop.name}
      </span>
      <span
          onClick={HandleSignOut}
        className={` cursor-pointer p-1 w-[30px] rounded-lg bg-secondary-100 flex justify-center items-center`}
      >
        <i className="fi fi-rs-sign-out-alt"></i>
      </span>
    </div>
  );
};

export default TopBar;
