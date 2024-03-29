import { useState } from "react";
import { AssetTitle } from "@/constants/assets";

export const useModal = <T>() => {
  const [state, setState] = useState<{
    type: T;
    assetTitle: AssetTitle;
  } | null>(null);

  const isOpen = (type: T) => (state?.type === type ? state?.assetTitle : null);

  const openModal = (type: T, assetTitle: AssetTitle) =>
    setState({ type, assetTitle });

  const close = () => setState(null);

  return { isOpen, openModal, close };
};
