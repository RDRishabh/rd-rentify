"use client"

import React from 'react';
import {sellerPropertyType} from "../../../../helper/API/seller/personal_properties";
import {useDisclosure} from "@nextui-org/react";
import AddProperty from "./AddProperty";
import {API_Properties_Add} from "../../../../helper/API/seller/add_properties";
import {toast} from "react-toastify";
import {toastCompactTheme} from "../../../../Default/toast";
import {API_Properties_Delete} from "../../../../helper/API/seller/delete_properties";

interface Props{
    data : sellerPropertyType[],
    next : string | null,
    previous : string | null,
}

const GetPropertyBySeller = (prop:Props) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleDelete = async (id:string) =>{
        const promise = new Promise(async (resolve, reject) => {
            const response = await API_Properties_Delete({property_id:id});
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
                    pending: "Deleting ...",
                    success: "Deleted successfully",
                },
                toastCompactTheme,
            ).then(()=>{
            location.reload()
        })
            .catch((reason) => {
                toast.error(reason, toastCompactTheme)
            });
    }

    return (
        <div className={`flex flex-col w-full gap-2 h-fit p-4`}>
            <AddProperty isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
            <div className={`flex justify-end`}>
                <button className={`px-2 py-1 rounded-md bg-green-100`} onClick={onOpen}>New</button>
            </div>
            <div className={`flex flex-col w-full items-center gap-2 h-fit p-4`}>
                {
                    prop.data.map((single) => (
                        <div key={single.id}
                             className={`flex gap-2 border-2 rounded-large max-w-[400px] md:max-w-[800px] w-full overflow-hidden shadow-lg flex-col md:flex-row relative`}>
                            <div className={`bg-red-50 text-red-500 p-2 rounded-md absolute right-3 top-1 cursor-pointer`} onClick={()=>{handleDelete(single.id)}}>
                                <i className="fi fi-rr-trash"></i>
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
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default GetPropertyBySeller;
