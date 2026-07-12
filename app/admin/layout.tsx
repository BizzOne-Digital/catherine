import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#15110D",
            color: "#E8D8C3",
            border: "1px solid rgba(214,181,109,0.3)",
            fontFamily: "Inter, sans-serif",
          },
          success: { iconTheme: { primary: "#D6B56D", secondary: "#080604" } },
        }}
      />
    </>
  );
}
