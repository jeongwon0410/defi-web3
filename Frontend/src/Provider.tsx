"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { kroma, sepolia } from "viem/chains";
import { createConfig, fallback, http, WagmiProvider, webSocket } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export const config = createConfig({
  chains: [sepolia, kroma],
  // TODO: deprecated 처리
  connectors: [injected(), metaMask()],
  transports: {
    // https://chainlist.org/?search=sepolia&testnets=true
    [sepolia.id]: fallback([
      webSocket("wss://sepolia.gateway.tenderly.co"),
      webSocket("wss://ethereum-sepolia-rpc.publicnode.com"),
      http("https://sepolia.gateway.tenderly.co", { batch: true }),
    ]),
    [kroma.id]: http("https://api.kroma.network", { batch: true }),
  },
  ssr: true,
  pollingInterval: 3000,
});

const queryClient = new QueryClient();
