import "@/styles/globals.css";

import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Provider from "@/Provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${pretendard.variable}`}>
      {/* react-modal을 위한 id */}
      <body
        className="h-[100vh] w-[100vw] bg-[#151515] font-pretendard"
        id="app"
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
