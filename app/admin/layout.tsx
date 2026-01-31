"use client";

import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import { Cake, Home, LogOut, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <Cake className="text-primary h-8 w-8" />
              <div>
                <h1
                  className="font-pacifico text-primary text-2xl"
                  style={{ fontFamily: "var(--font-pacifico), cursive" }}
                >
                  🧁 Tiệm Bánh Ngọt
                </h1>
                <p className="text-sm text-gray-500">Trang quản trị</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/admin/cakes">
                <Button variant="ghost">
                  <Cake className="mr-2 h-4 w-4" />
                  Quản lý bánh
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button variant="ghost">
                  <Package className="mr-2 h-4 w-4" />
                  Quản lý đơn hàng
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Về trang chủ
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
