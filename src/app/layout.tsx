import "./globals.css";
import localFont from "next/font/local";
import SiteHeader from "@/components/dashboard/siteHeader";

const nexaFont = localFont({
  src: [
    {
      path: "../fonts/Nexa-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Nexa-Heavy.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "Project PAGSACA",
  description:
    "DOST-SEI 7th IMake WeMake: Create, Innovate, Collaborate Top 20 Finalist Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nexaFont.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
