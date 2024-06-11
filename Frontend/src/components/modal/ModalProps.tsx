import { AssetTitle } from "@/contracts/assets";

export type ModalProps = {
  assetTitle: AssetTitle;
  close: () => void;
};
