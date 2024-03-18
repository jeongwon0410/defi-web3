import Account from "./Account";
import Borrow from "./Borrow";
import Supply from "./Supply";
import Table from "./Table";

export default function AccountMain() {
  return (
    <div className=" justify-center  items-center flex  flex-col mt-20 ">
      <div className="font-montserrat  font-bold text-[30px] leading-[45px] text-[white]">
        My Account
      </div>
      <div className="flex  gap-10 justify-center items-center mt-10">
        <div className="w-[500px] ">
          <Supply />
        </div>
        <div className="w-[500px] ">
          <Borrow />
        </div>
      </div>
    </div>
  );
}
