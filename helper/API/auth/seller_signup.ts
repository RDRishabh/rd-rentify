"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";
import {SaveToken} from "../../Token/jwt";

interface requestType{
    email : string
    first_name : string
    last_name : string
    password : string
    mobileNo : string
}

interface responseType{
    error: boolean,
    data ?: string,
    message ?: string[],
    status_code: number
}

const API_Auth_Seller_SignUp = async (data:requestType) : Promise<responseType> =>{
    try{

        SimpleLog.info(`[ CALLED ] : API_Auth_Seller_SignUp : ${JSON.stringify(data)}`)
        const response:responseType =  await axios.post(process.env.BACKEND_URL + "/v1/seller/signUp", data).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Auth_Seller_SignUp : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Auth_Seller_SignUp : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_Auth_Seller_SignUp}
