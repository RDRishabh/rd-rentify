"use client"

import {Button, useDisclosure} from "@nextui-org/react";
import MountSellerDetails from "./MountSellerDetails";
import React, {useState} from "react";
import {API_Properties_GetSellerDetails} from "../../../helper/API/seller/seller_details";
import {toast} from "react-toastify";
import {toastCompactTheme} from "../../../Default/toast";
import {allPropertyType} from "../../../helper/API/buyer/get_all";
import {API_Property_Like} from "../../../helper/API/buyer/like_property";
import Link from "next/link";

interface Props{
    data : allPropertyType[],
    next : string | null,
    previous : string | null,
    curr: number
}

const GetPropertyBySeller = (prop:Props) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [sellerDetails,setSellerDetails] = useState<any>();
    const [filteredData,setFilteredData] = useState(prop.data)

    const HandleGetDetails = async (property:string) =>{
        const data = await API_Properties_GetSellerDetails({property_id:property});
        if(!data.responseData)
            return toast.error("data not found",toastCompactTheme)

        setSellerDetails(data.responseData);
        onOpen();
    }

    const HandleLike = async (id:string) =>{
        const response = await API_Property_Like({id:id});
        if (!response.error) {
            setFilteredData((prev)=>(prev.map((single)=>{
                if(single.id !== id)
                    return JSON.parse(JSON.stringify(single))
                else {
                    let temp = single
                    temp.liked = true;
                    return JSON.parse(JSON.stringify(temp))
                }
            })))
        }
    }

    return (
        <div className={`flex flex-col w-full gap-2 h-fit p-4`}>

            <MountSellerDetails isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} sellerDetails={sellerDetails} />
            <div className={`flex flex-col w-full items-center gap-2 h-fit p-4`}>
                {
                    filteredData.map((single) => (
                        <div key={single.id}
                             className={`flex gap-2 border-2 rounded-large max-w-[400px] md:max-w-[800px] w-full overflow-hidden shadow-lg flex-col md:flex-row relative`}>

                            <div
                                className={`bg-red-50 text-red-500 p-2 rounded-md absolute right-3 top-1 cursor-pointer`}
                                onClick={() => {
                                    HandleLike(single.id)
                                }}>
                                {
                                    single.liked ? (<i className="fi fi-sr-heart"></i>) : (<i className="fi fi-rr-heart"></i>)
                                }
                            </div>

                            <div className={`w-full max-w-[300px]`}>
                                <img src={process.env.BACKEND_URL + single.images[0].image}
                                     className={`p-2 aspect-square object-cover object-center border-r-2`}
                                     alt={`image_${single.id}`}/>
                            </div>
                            <div className={`w-full flex flex-col gap-4 p-2 justify-between`}>
                                <div className={`flex flex-col gap-3`}>
                                    <span className={`font-semibold text-2xl`}>{single.title}</span>
                                    <div className={``}>
                                        <span className={`font-semibold min-w-[50px]`}>{single.bedrooms} BHK </span>
                                        <span>in {single.address} </span>
                                        <span>with {single.bathrooms} bathrooms</span>
                                    </div>
                                    <div>
                                        <span className={`font-semibold text-2xl`}>{single.cost} /Month</span>
                                    </div>
                                    <div>
                                        <span className={`line-clamp-2`}>{single.description}</span>
                                    </div>
                                    <div className={`flex gap-4 flex-wrap`}>
                                    <span
                                        className={`px-2 bg-amber-100 rounded-md`}>Hospital : {single.distance_from_hospital} KM</span>
                                        <span
                                            className={`px-2 bg-amber-100 rounded-md`}>College : {single.distance_from_college} KM</span>
                                    </div>
                                </div>
                                <div className={`flex justify-center`}>
                                    <button className={`px-2 py-1 rounded-md bg-blue-100`} onClick={() => {
                                        HandleGetDetails(single.id)
                                    }}>
                                        Interested
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={`flex justify-center gap-4`}>
                <Link href={`${prop.previous ? prop.curr - 1 : ""}`} className={`px-2 py-1 rounded-md ${prop.previous ? "bg-blue-100 cursor-pointer" : "bg-gray-100 cursor-not-allowed pointer-events-none"}`}>Prev</Link>
                <Link href={`${prop.next ? prop.curr + 1 : ""}`} className={`px-2 py-1 rounded-md ${prop.next ? "bg-blue-100 cursor-pointer" : "bg-gray-100 cursor-not-allowed pointer-events-none"}`}>Next</Link>
            </div>
        </div>
    );
};

export default GetPropertyBySeller;
