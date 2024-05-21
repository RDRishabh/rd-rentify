import React from 'react';
import {redirect} from "next/navigation";
import {API_Properties_GetAll} from "../../../../../../helper/API/buyer/get_all";
import GetPropertyAll from "../../../../../../components/dashboard/buyer/GetPropertyAll";

const Page = async ({params}:{params:{page:string}}) => {
    const data = await API_Properties_GetAll({pageNumber:Number(params.page)});
    if(!data.responseData)
        return redirect("/404");

    return (
        <div className={`flex justify-center w-full`}>
            <GetPropertyAll data={data.responseData.results} next={data.responseData.next} previous={data.responseData.previous} curr={Number(params.page)} />
        </div>
    );
};

export default Page;
