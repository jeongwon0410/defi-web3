import { PropsWithChildren } from "react";

export default function Background({ children }: PropsWithChildren) {
  return (
    <div className=" w-[101%] h-[101%] -top-2 -left-2 fixed bg-[#151515] overflow-auto">
      {children}
    </div>
  );
}
