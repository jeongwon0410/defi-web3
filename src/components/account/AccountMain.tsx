import Borrow from "./Borrow";
import Supply from "./Supply";
import { useTmpContext } from "@/pages/TmpContext";

export default function AccountMain() {
    const { address } = useTmpContext();

    return (
        <div className=" justify-center  items-center flex  flex-col mt-20 ">
            <div className="font-montserrat  font-bold text-[30px] leading-[45px] text-[white]">
                My Account
            </div>
            <div className="flex  gap-10 justify-center items-center mt-10">
                <div className="w-[510px]">
                    {address && <Supply account={address} />}
                </div>
                <div className="w-[510px]">
                    {address && <Borrow account={address} />}
                </div>
            </div>
        </div>
    );
}
