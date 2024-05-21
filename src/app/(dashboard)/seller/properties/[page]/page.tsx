import React from 'react';
import {API_Properties_GetPersonal} from "../../../../../../helper/API/seller/personal_properties";
import {redirect} from "next/navigation";
import GetPropertyBySeller from "../../../../../../components/dashboard/seller/property/GetPropertyBySeller";

const Page = async ({params}:{params:{page:string}}) => {
    const data = await API_Properties_GetPersonal({pageNumber:Number(params.page)});
    if(!data.responseData)
        return redirect("/404");

    return (
        <div className={`flex justify-center w-full`}>
            <GetPropertyBySeller data={data.responseData.results} next={data.responseData.next} previous={data.responseData.previous} />
        </div>
    );
};

export default Page;
