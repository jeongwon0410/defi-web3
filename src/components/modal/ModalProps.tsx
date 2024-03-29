import { AssetTitle } from "@/constants/assets";

export type ModalProps = {
  assetTitle: AssetTitle | null;
  close: () => void;
};
