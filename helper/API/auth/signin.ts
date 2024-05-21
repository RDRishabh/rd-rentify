"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";
import {SaveToken} from "../../Token/jwt";

interface requestType{
    email:string,
    password:string
}

export interface UserSignInReturn{
    expiry : string ,
    token : string ,
    email : string ,
    user : string ,
    type : number ,
    type_name : string ,
    message : string ,
    name: string
}

interface responseType{
    error: boolean,
    responseData ?: UserSignInReturn,
    message ?: string[],
    status_code: number
}

const API_Auth_SignIn = async (data:requestType) : Promise<responseType> =>{
    try{

        SimpleLog.info(`[ CALLED ] : API_Auth_HandleSignIn : ${JSON.stringify(data)}`)
        const response:responseType =  await axios.post(process.env.BACKEND_URL + "/auth/seller_login/", data).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Auth_HandleSignIn : ${JSON.stringify(response)}`)
        if(response.error === false && response.responseData){
            const cookieFactory = cookies()
            const expiryDate = new Date(response.responseData.expiry);
            cookieFactory.set("accessToken",response.responseData.token , {
                expires : expiryDate
            })
            await SaveToken(response.responseData);
        }
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Auth_HandleSignIn : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_Auth_SignIn}
