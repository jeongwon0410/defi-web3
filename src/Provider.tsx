"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { sepolia } from "viem/chains";
import { createConfig, http, WagmiProvider } from "wagmi";
import { injected, metaMask, safe } from "wagmi/connectors";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

const config = createConfig({
  chains: [sepolia],
  // TODO: deprecated
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();
