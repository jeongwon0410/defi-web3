import Background from "@/components/Background";
import Header from "@/components/Header";
import AccountMain from "@/components/account/AccountMain";
import RewardMain from "@/components/reward/RewardMain";

import { useState } from "react";

export default function Reward() {
  const [account, setAccount] = useState("");
  return (
    <Background>
      <Header setAccount={setAccount} />
      <RewardMain />
    </Background>
  );
}
