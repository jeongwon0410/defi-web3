import Background from "./component/Background";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Main from "./component/main/Main";

export default function Home() {
  return (
    <Background>
      <Header />
      <Main />
    </Background>
  );
}
