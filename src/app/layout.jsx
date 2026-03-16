import { Inter, Onest } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

export const metadata = {
  title: "FlowEdit",
  description: "FlowEdit Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${onest.variable} font-inter antialiased bg-[#A5C9E8]`}>
        {children}
      </body>
    </html>
  );
}
