import {redirect} from "next/navigation";

const Page = async () => {
    return redirect("/properties/all/1");
};

export default Page;
