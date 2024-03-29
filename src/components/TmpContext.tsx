"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export const AccountContext = createContext<{
  account: string | null;
  setAccount: (value: string) => void;
}>({ account: null, setAccount: () => {} });

export const useAccountContext = () => useContext(AccountContext);

export const AccountContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <AccountContext.Provider
      value={{ account: account, setAccount: setAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
};
