import ModalBottom from "./ModalBottom";
import ModalHeader from "./ModalHeader";
import ModalTop from "./ModalTop";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ setOpen }: Props) {
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
          <ModalHeader setOpen={setOpen} />
          <ModalTop />
          {/* <ModalBottom /> */}
        </div>
      </div>
    </div>
  );
}
