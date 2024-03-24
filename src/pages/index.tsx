import Background from "../components/Background";
import Header from "../components/Header";
import Main from "../components/main/Main";
import { useState } from "react";

export default function Home() {
  return (
    <Background>
      <Header />
      <Main />
    </Background>
  );
}
