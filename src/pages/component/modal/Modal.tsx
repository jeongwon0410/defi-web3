import ModalMiddle from "./ModalMiddle";
import ModalHeader from "./ModalHeader";
import ModalMain from "./ModalMain";
import ModalTop from "./ModalTop";
import ModalSupplyButton from "./button/ModalSupplyButton";
import { useState } from "react";
import ModalBorrowButton from "./button/ModalBorrowButton";
import ModalWithdrawButton from "./button/ModalWithdrawButton";
import ModalRepayButton from "./button/ModalRepayButton";

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
  max: string;
}

export default function Modal({
  setOpen,
  item,
  cryptoImg,
  cryptoName,
  max,
}: Props) {
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
          <ModalHeader setOpen={setOpen} name={item && item.name} />
          <ModalMain>
            <div>
              <ModalTop
                content={item && item.content}
                cryptoImg={cryptoImg}
                cryptoName={cryptoName}
              />
            </div>
            <div className="mt-5">
              <ModalMiddle setAmount={setAmount} amount={amount} max={max} />
            </div>
            {item && item.name === "Supply" ? (
              <div className="mt-5">
                <ModalSupplyButton
                  amount={amount}
                  setOpen={setOpen}
                  cryptoName={cryptoName}
                  max={max}
                />
              </div>
            ) : item && item.name === "Withdraw" ? (
              <div className="mt-5">
                <ModalWithdrawButton
                  amount={amount}
                  setOpen={setOpen}
                  cryptoName={cryptoName}
                  max={max}
                />
              </div>
            ) : item && item.name === "Borrow" ? (
              <div className="mt-5">
                <ModalBorrowButton
                  amount={amount}
                  setOpen={setOpen}
                  cryptoName={cryptoName}
                  max={max}
                />
              </div>
            ) : (
              <div className="mt-5">
                <ModalRepayButton
                  amount={amount}
                  setOpen={setOpen}
                  cryptoName={cryptoName}
                  max={max}
                />
              </div>
            )}
          </ModalMain>
        </div>
      </div>
    </div>
  );
}
