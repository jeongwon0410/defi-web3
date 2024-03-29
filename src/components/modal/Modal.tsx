import Image from "next/image";
import { MouseEventHandler } from "react";
import _Modal from "react-modal";

_Modal.setAppElement("#app");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxHeight: "90%",
    transform: "translate(-50%, -50%)",
    width: "30.125rem",
    backgroundColor: "#38B82D",
    padding: 0,
    borderRadius: "0.875rem",
    border: "",
  },
  overlay: {
    backgroundColor: "rgba(11, 11, 11, 0.75)",
  },
};

type Props = _Modal.Props & { title?: string };

export default function Modal({
  title,
  onRequestClose,
  children,
  ...props
}: Props) {
  return (
    <_Modal {...props} onRequestClose={onRequestClose} style={customStyles}>
      <ModalHeader title={title ?? "-"} close={onRequestClose} />
      <div className="z-10 flex flex-col gap-5 overflow-y-scroll rounded-[0.875rem] border-2 border-[#4A8350] bg-[#1B1B1B] px-[1.12rem] py-[1.38rem]">
        {children}
      </div>
    </_Modal>
  );
}

const ModalHeader = ({
  title,
  close,
}: {
  title: string;
  close?: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div className="relative py-[1.25rem]">
    <h3 className="text-center text-[1.375rem] font-extrabold leading-[1.6235rem] text-white">
      {title}
    </h3>
    <button onClick={close} className="absolute right-[1.44rem] top-[1.36rem]">
      <Image
        src="/close.svg"
        width={24}
        height={24}
        alt=""
        className="h-auto w-auto"
      />
    </button>
  </div>
);
