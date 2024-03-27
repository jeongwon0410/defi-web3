"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// jotai 대체를 위한 임시 context
export const TmpContext = createContext<{
  address: string | null;
  setAddress: (value: string) => void;
}>({ address: null, setAddress: () => {} });

export const useTmpContext = () => useContext(TmpContext);

const queryClient = new QueryClient();

export const TmpContextProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <TmpContext.Provider value={{ address, setAddress }}>
        {children}
      </TmpContext.Provider>
    </QueryClientProvider>
  );
};
