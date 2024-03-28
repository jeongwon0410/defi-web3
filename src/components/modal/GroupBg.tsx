import { ReactNode } from "react";

export default function GroupBg({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`w-full rounded-[20px] bg-[#151615] p-6 ${className}`}>
      {children}
    </div>
  );
}
