import { ReactNode } from "react";
import Navbar from "@/pages/navbar";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <Navbar />
      <main className="flex flex-col w-full pt-20">
        {children}
      </main>
    </div>
  );
}
