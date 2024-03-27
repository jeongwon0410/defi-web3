"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import Background from "../components/Background";
import Header from "../components/Header";
import Main from "../components/main/Main";
import { TmpContextProvider } from "../components/TmpContext";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <TmpContextProvider>
        <Background>
          <Header />
          <Main />
        </Background>
      </TmpContextProvider>
    </QueryClientProvider>
  );
}
