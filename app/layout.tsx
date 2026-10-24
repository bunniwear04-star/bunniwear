import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "bunniwear | เสื้อผ้าแฟชั่นสไตล์เกาหลี มินิมอล ปลีก-ส่ง ออกใบเสนอราคา",
  description: "ร้าน bunniwear จำหน่ายเสื้อผ้าแฟชั่นหญิง-ชาย ปลีกและส่ง ราคาโรงงาน ออกใบเสนอราคา PDF ออนไลน์ทันที",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-stone-800 bg-[#fbfbf9]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}