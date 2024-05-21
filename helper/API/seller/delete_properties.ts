"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";
import {SaveToken} from "../../Token/jwt";

interface requestType{
    property_id:string
}

interface responseType{
    error: boolean,
    data ?: string,
    message ?: string,
    status_code: number
}

const API_Properties_Delete = async (data:requestType) : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : "SignIn again"
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Properties_Delete :`)
        const response:responseType =  await axios.post(process.env.BACKEND_URL + `/seller/deleteProperty/?property_id=${data.property_id}`,{},{
            headers:{
                Authorization: `bearer ${accessToken}`,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Properties_Delete : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Properties_Delete : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : "Internal Server Error"
        }
    }
}

export {API_Properties_Delete}
