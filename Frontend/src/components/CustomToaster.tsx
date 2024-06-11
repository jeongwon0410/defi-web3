"use client";

import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      toastOptions={{ style: { wordBreak: "break-word", maxWidth: 500 } }}
    />
  );
}
