import ModalMiddle from "./ModalMiddle";
import ModalHeader from "./ModalHeader";
import ModalMain from "./ModalMain";
import ModalTop from "./ModalTop";
import ModalBottom from "./ModalBottom";
import { useState } from "react";
interface item {
  name: string;
  ratio: string;
}

interface Content {
  name: string;
  content: Array<item>;
}
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: Content;
  cryptoImg: string;
  cryptoName: string;
}

export default function Modal({ setOpen, item, cryptoImg, cryptoName }: Props) {
  const [amount, setAmount] = useState("");
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex flex-col h-full w-full justify-center items-center ">
          <ModalHeader setOpen={setOpen} name={item.name} />
          <ModalMain>
            <div>
              <ModalTop
                content={item.content}
                cryptoImg={cryptoImg}
                cryptoName={cryptoName}
              />
            </div>
            <div className="mt-5">
              <ModalMiddle setAmount={setAmount} amount={amount} />
            </div>
            <div className="mt-5">
              <ModalBottom name={item.name} amount={amount} setOpen={setOpen} />
              {/* <ModalBottom /> */}
            </div>
          </ModalMain>
        </div>
      </div>
    </div>
  );
}
