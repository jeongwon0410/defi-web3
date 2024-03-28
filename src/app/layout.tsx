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
      {/* TODO: min-w 처리 */}
      <body
        className="h-full w-full min-w-[1400px] overflow-scroll bg-[#151515] font-pretendard"
        id="app"
      >
        {children}
      </body>
    </html>
  );
}
