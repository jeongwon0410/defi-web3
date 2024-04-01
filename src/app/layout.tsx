import "@/styles/globals.css";

import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="overflow-scroll bg-[#151515] font-pretendard" id="app">
        {children}
        <Image
          fill
          src="/landing/background.svg"
          className="absolute bottom-0 left-0 right-0 top-0 -z-50 object-cover"
          alt=""
        />
      </body>
    </html>
  );
}
