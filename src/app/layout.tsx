import "@/styles/globals.css";

import { ReactNode } from "react";
import { Montserrat } from "next/font/google";

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
      </body>
    </html>
  );
}
