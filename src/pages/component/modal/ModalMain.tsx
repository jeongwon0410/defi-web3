interface Props {
  children: React.ReactNode;
}

export default function ModalMain({ children }: Props) {
  return (
    <div className="relative -top-3 bg-[#1B1B1B] rounded-lg w-full max-w-lg border border-[#38B82D]">
      <div className=" w-full max-w-lg flex justify-between px-10 py-8">
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </div>
  );
}
