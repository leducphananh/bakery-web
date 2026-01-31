import { AuthProvider } from "@/lib/context/AuthContext";
import { CartProvider } from "@/lib/context/CartContext";
import type { Metadata } from "next";
import { Pacifico, Poppins } from "next/font/google";
import { Toaster } from "./components/ui/sonner";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-pacifico",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiệm Bánh Ngọt - Bánh ngon mỗi ngày",
  description:
    "Cửa hàng bánh ngọt với đa dạng các loại bánh tươi ngon mỗi ngày",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FFB5C5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8'/><path d='M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1'/><path d='M2 21h20'/><path d='M7 8v3'/><path d='M12 8v3'/><path d='M17 8v3'/><path d='M7 4h.01'/><path d='M12 4h.01'/><path d='M17 4h.01'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${pacifico.variable} ${poppins.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster
              toastOptions={{
                classNames: {
                  toast: "rounded-3xl border-2 shadow-xl bg-white font-poppins",
                  title: "font-semibold text-[#8B5A3C]",
                  description: "text-gray-600",
                  success: "border-[#FFB5C5]",
                  error: "border-red-400",
                  warning: "border-yellow-400",
                  info: "border-[#8B5A3C]",
                  actionButton:
                    "rounded-full bg-gradient-to-r from-[#FFB5C5] to-[#FF8FAB] text-white hover:scale-105 transition-transform",
                  cancelButton:
                    "rounded-full bg-gray-200 text-[#8B5A3C] hover:bg-gray-300",
                  closeButton:
                    "bg-white hover:bg-gray-100 text-[#8B5A3C] border-2 border-gray-200 rounded-full",
                },
              }}
              position="bottom-right"
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
