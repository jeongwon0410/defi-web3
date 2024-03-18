import Account from "./Account";
import Table from "./Table";

export default function Borrow() {
  return (
    <div className="overflow-hidden rounded-lg w-full max-w-lg">
      <div className="bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] px-4 pt-5 pb-7">
        <div className="flex justify-between ">
          <div className="font-pretendard font-extrabold text-[22px] leading-[26px] text-white">
            Borrow
          </div>
          <div className="font-pretendard font-extrabold text-[22px] leading-[26px] text-white">
            Balance : 000
          </div>
        </div>
      </div>
      <Account>
        <Table />
      </Account>
    </div>
  );
}
