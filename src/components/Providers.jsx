"use client";
import { Toaster } from "react-hot-toast";
import { DataProvider } from "./DataProvider";

export default function Providers({ children }) {
  return (
    <DataProvider>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
    </DataProvider>
  );
}
