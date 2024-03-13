interface item {
  name: string;
  ratio: number;
}

interface Props {
  content: Array<item>;
  cryptoImg: string;
  cryptoName: string;
}
export default function ModalTop({ content, cryptoImg, cryptoName }: Props) {
  return (
    <div className="p-6 rounded-[20px] bg-[#151615] w-full">
      <div className="flex mb-5 flex-col">
        <div className="flex">
          <img src={cryptoImg} className="w-[68px] h-[68px] mr-5" />
          <div className="flex font-pretendard font-bold text-[16px] leading-[22px] text-[#BCE8B9]  items-center justify-center">
            {cryptoName}
          </div>
        </div>
        <div className=" bg-[#1D1D1D] h-[1px] w-[390px] mt-5" />
      </div>

      <div className="flex flex-col text-white">
        {content.map((item, index) => (
          <div key={index} className="flex justify-between mb-3">
            <div>{item.name}</div>
            <div>{item.ratio}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
