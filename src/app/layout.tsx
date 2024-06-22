import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/dashboard/siteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project PAGSACA",
  description:
    "DOST-SEI 7th IMake WeMake: Create, Innovate, Collaborate Top 20 Finalist Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
