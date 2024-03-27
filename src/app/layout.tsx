import { ReactNode } from "react";
import { TmpContextProvider } from "@/components/TmpContext";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TmpContextProvider>{children}</TmpContextProvider>
      </body>
    </html>
  );
}
