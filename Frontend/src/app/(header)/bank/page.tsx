"use client";

import Image from "next/image";
import { useMainDev } from "../../../contracts/dev/bank";
import RepayModal from "./modals/RepayModalContent";
import SupplyModalContent from "./modals/SupplyModalContent";
import BorrowModal from "./modals/BorrowModalContent";
import WithdrawModalContent from "./modals/WithdrawModalContent";
import BorrowTable from "@/app/(header)/bank/BorrowTable";
import SupplyTable from "@/app/(header)/bank/SupplyTable";
import Switch from "@/app/(header)/bank/Switch";
import Modal from "@/components/modal/Modal";
import { allAssetTitles } from "@/contracts/assets";

export default function Main() {
  const {
    tab,
    setTab,
    expanded,
    toggle,
    supplyTableData,
    borrowTableData,
    modal,
    openModal,
    closeModal,
  } = useMainDev();

  const supplyTabModalData =
    modal && supplyTableData[allAssetTitles.indexOf(modal.assetTitle)];
  const borrowTabModalData =
    modal && borrowTableData[allAssetTitles.indexOf(modal.assetTitle)];

  const modalTitle = modal
    ? modal.type.charAt(0).toUpperCase() + modal.type.slice(1)
    : "-";

  return (
    <div className="flex flex-col justify-center">
      <Switch tab={tab} setTab={setTab} />

      {tab === "supply" ? (
        <SupplyTable
          data={expanded ? supplyTableData : supplyTableData.slice(0, 4)}
          openModal={openModal}
        />
      ) : (
        <BorrowTable
          data={expanded ? borrowTableData : borrowTableData.slice(0, 4)}
          openModal={openModal}
        />
      )}

      <AllMarketButton expanded={expanded} toggle={toggle} />

      <Modal
        isOpen={modal !== null}
        onRequestClose={closeModal}
        title={modalTitle}
      >
        {modal?.type === "supply" && (
          <SupplyModalContent
            assetTitle={modal.assetTitle}
            close={closeModal}
            apy={supplyTabModalData?.apy}
            maxLTV={supplyTabModalData?.ltv}
            mySupply={supplyTabModalData?.supplied}
          />
        )}
        {modal?.type === "withdraw" && (
          <WithdrawModalContent
            assetTitle={modal.assetTitle}
            close={closeModal}
            mySupply={supplyTabModalData?.supplied}
            apy={borrowTabModalData?.apy}
          />
        )}
        {modal?.type === "borrow" && (
          <BorrowModal
            assetTitle={modal.assetTitle}
            close={closeModal}
            apy={borrowTabModalData?.apy}
          />
        )}
        {modal?.type === "repay" && (
          <RepayModal
            assetTitle={modal.assetTitle}
            close={closeModal}
            apy={supplyTabModalData?.apy}
          />
        )}
      </Modal>
    </div>
  );
}

const AllMarketButton = ({
  expanded,
  toggle,
}: {
  expanded: boolean;
  toggle: () => void;
}) => {
  return (
    <button
      className="mt-5 flex flex-col items-center hover:opacity-50"
      onClick={toggle}
    >
      {expanded && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={22}
          height={13}
          fill="none"
        >
          <path
            fill="#525C52"
            d="m10.998.596 10.615 10.616-1.415 1.415-9.2-9.2-9.2 9.2-1.416-1.415L10.998.596Z"
          />
        </svg>
      )}
      {!expanded && (
        <>
          <div className="flex items-center">
            <Image
              src="/bank/add.svg"
              width={16}
              height={16}
              alt=""
              className="h-auto w-auto"
            />
            <div className=" text-[0.8rem] font-semibold text-[#525C52]">
              All market
            </div>
          </div>
          <div className="mt-1 h-[1px] w-[99px] bg-[#525C52]" />
        </>
      )}
    </button>
  );
};
