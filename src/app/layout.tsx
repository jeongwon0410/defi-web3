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
      {/* react-modal을 위한 id */}
      <body className="overflow-scroll bg-[#151515] font-pretendard" id="app">
        {children}
      </body>
    </html>
  );
}
