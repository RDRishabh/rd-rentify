import {redirect} from "next/navigation";

const Page = async () => {
    return redirect("/seller/properties/1");
};

export default Page;
