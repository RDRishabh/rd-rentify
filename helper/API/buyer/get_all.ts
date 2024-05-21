"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";
import {RolesTypes} from "../../../Static/links";

interface requestType{
    pageNumber:number
}

export interface allPropertyType {
    id : string
    title : string
    description : string
    pincode : number
    country : string
    city : string
    state : string
    address : string
    bedrooms : number
    bathrooms : number
    distance_from_college : string
    distance_from_hospital : string
    images : { image: string }[]
    cost: string
    liked: boolean
}

interface responseType{
    error: boolean,
    responseData ?: {
        count : number
        next : string | null
        previous : string | null
        results : allPropertyType[]
    },
    message ?: string[],
    status_code: number
}

const API_Properties_GetAll = async (data:requestType) : Promise<responseType> =>{

    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Properties_GetAll :`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + `/buyer/getProperty/?page=${data.pageNumber}&limit=10`, {
            headers:{
                Authorization: `bearer ${accessToken}`,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Properties_GetAll : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Properties_GetAll : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_Properties_GetAll}
