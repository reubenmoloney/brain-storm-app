import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brainstorm",
  description: "A Collaborative Online Workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> 
      <html lang="en">
        <body className={inter.className}>
          <SocketProvider>
            <ModalProvider />
            <QueryProvider>
              {children}
            </QueryProvider>
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider> 
  );
}
