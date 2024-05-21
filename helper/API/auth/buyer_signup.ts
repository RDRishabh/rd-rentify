"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";
import {SaveToken} from "../../Token/jwt";

interface requestType{
    f_name : string
    l_name : string
    email : string
    password : string
    password2 : string
    phone_no : string
    user_type : number
}

interface responseType{
    error: boolean,
    data ?: string,
    message ?: string[],
    status_code: number
}

const API_Auth_Buyer_SignUp = async (data:requestType) : Promise<responseType> =>{
    try{

        SimpleLog.info(`[ CALLED ] : API_Auth_Buyer_SignUp : ${JSON.stringify(data)}`)
        const response:responseType =  await axios.post(process.env.BACKEND_URL + "/auth/signup/", data).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Auth_Buyer_SignUp : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Auth_Buyer_SignUp : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_Auth_Buyer_SignUp}
