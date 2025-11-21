import { Button } from "@/app/components/ui/button";
import { Cake, Home } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#FFF5E6] to-[#FFE9F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/admin/cakes" className="flex items-center gap-3">
              <Cake className="h-8 w-8 text-[#FFB5C5]" />
              <div>
                <h1
                  className="font-pacifico text-2xl text-[#8B5A3C]"
                  style={{ fontFamily: "var(--font-pacifico), cursive" }}
                >
                  Milove
                </h1>
                <p className="text-sm text-gray-500">Trang quản trị</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/admin/cakes">
                <Button
                  variant="ghost"
                  className="text-[#8B5A3C] hover:text-[#FFB5C5]"
                >
                  Quản Lý Bánh
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-full border-[#FFB5C5] text-[#8B5A3C] hover:bg-[#FFB5C5]/10"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Về trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
