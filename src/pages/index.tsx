import Background from "../components/Background";
import Header from "../components/Header";
import Main from "../components/main/Main";
import { useState } from "react";

export default function Home() {
  const [account, setAccount] = useState("");
  return (
    <Background>
      <Header setAccount={setAccount} />
      <Main account={account} />
    </Background>
  );
}
