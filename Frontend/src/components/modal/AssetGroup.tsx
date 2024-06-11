import Image from "next/image";
import GroupBg from "./GroupBg";
import { AssetTitle, titleToIcon } from "@/contracts/assets";

type Props = {
  title: AssetTitle | null;
  content: {
    name: string;
    value: string;
  }[];
};

export default function AssetGroup({ content, title }: Props) {
  return (
    <GroupBg className="p-8">
      <div className="mb-5 flex flex-col">
        <div className="flex">
          {title !== null && (
            <Image
              src={titleToIcon[title]}
              className="mr-5"
              width={68}
              height={68}
              alt=""
            />
          )}

          <div className="flex items-center justify-center  text-[16px] font-bold  leading-[22px] text-[#BCE8B9]">
            {title}
          </div>
        </div>
        <div className="mt-5 h-[1px] w-[390px] bg-[#1D1D1D]" />
      </div>

      <div className="flex flex-col text-white">
        {content.map((item, index) => (
          <div key={index} className="mb-3 flex justify-between">
            <p>{item.name}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </GroupBg>
  );
}
