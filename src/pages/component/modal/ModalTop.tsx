export default function ModalTop() {
  return (
    <div className="relative -top-3 bg-[#1B1B1B] rounded-lg w-full max-w-lg border border-[#38B82D]">
      <div className=" w-full max-w-lg flex justify-between px-10 py-8">
        <div className="flex flex-wrap w-full">
          <div className="p-6 rounded-[20px] bg-[#151615] w-full">
            <div className="flex mb-5 flex-col">
              <div className="flex">
                <img src="ETH.png" className="w-[68px] h-[68px] mr-5" />
                <div className="flex font-pretendard font-bold text-[16px] leading-[22px] text-[#BCE8B9]  items-center justify-center">
                  USDC
                </div>
              </div>
              <div className=" bg-[#1D1D1D] h-[1px] w-[390px] mt-5" />
            </div>

            <div className="flex flex-col text-white">
              <div className="flex justify-between mb-3">
                <div>Wallet balance</div>
                <div>00.00</div>
              </div>
              <div className="flex justify-between mb-3">
                <div>Amount Supplied</div>
                <div>00.00</div>
              </div>
              <div className="flex justify-between">
                <div>APY</div>
                <div>~%</div>
              </div>
              <div className="flex justify-between">
                <div>Max LTV</div>
                <div>~%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
