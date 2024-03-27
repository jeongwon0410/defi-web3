import { PropsWithChildren } from "react";

export default function Background({ children }: PropsWithChildren) {
  return <div className="h-full w-full bg-[#151515]">{children}</div>;
}
