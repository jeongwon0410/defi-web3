import { useAccount, useSwitchChain } from "wagmi";
import Modal from "@/components/modal/Modal";

export default function NetworkModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const { chain: curChain } = useAccount();
  const { chains, switchChainAsync } = useSwitchChain();

  return (
    <Modal isOpen={isOpen} onRequestClose={close} title="Network">
      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={async () => {
            await switchChainAsync({ chainId: chain.id });
            close();
          }}
          className="text-white disabled:opacity-30"
          disabled={curChain?.id === chain.id}
        >
          {chain.name}
        </button>
      ))}
    </Modal>
  );
}
