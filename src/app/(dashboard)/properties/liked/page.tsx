import {redirect} from "next/navigation";

const Page = async () => {
    return redirect("/properties/liked/1");
};

export default Page;
