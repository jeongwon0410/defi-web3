import { ReactNode } from "react";

export default function ModalButton({
  disabled,
  onClick,
  children,
}: {
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className="w-full rounded-lg bg-[#52A44B] py-4 text-[20px] font-bold leading-[25px] text-white disabled:bg-gray-300"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
