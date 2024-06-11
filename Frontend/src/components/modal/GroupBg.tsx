import { ReactNode } from "react";

export default function GroupBg({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-[20px] bg-[#151615] ${className}`}>{children}</div>
  );
}
