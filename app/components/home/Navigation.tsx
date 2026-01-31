"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import { Cake, LogIn, LogOut, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Navigation() {
  const { user, profile, signOut } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Cake className="h-8 w-8 text-[#FFB5C5]" />
            <span
              className="text-2xl text-[#8B5A3C]"
              style={{ fontFamily: "var(--font-pacifico), cursive" }}
            >
              Milove
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/"
                className="text-[#8B5A3C] transition-colors hover:text-[#FFB5C5]"
              >
                Trang chủ
              </Link>
              <Link
                href="/products"
                className="text-[#8B5A3C] transition-colors hover:text-[#FFB5C5]"
              >
                Sản phẩm
              </Link>
            </div>

            {/* Cart Button */}
            <Link href="/cart" className="relative">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-[#FFB5C5]/10"
              >
                <ShoppingCart className="h-5 w-5 text-[#8B5A3C]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFB5C5] text-xs font-semibold text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full hover:bg-[#FFB5C5]/10"
                  >
                    <User className="h-5 w-5 text-[#8B5A3C]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-2xl border-2 border-[#FFB5C5]/20"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold text-[#8B5A3C]">
                      {profile?.full_name || user.email}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="cursor-pointer text-[#8B5A3C]"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Tài khoản
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/orders"
                      className="cursor-pointer text-[#8B5A3C]"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Đơn hàng
                    </Link>
                  </DropdownMenuItem>
                  {profile?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin"
                        className="cursor-pointer text-[#8B5A3C]"
                      >
                        <Cake className="mr-2 h-4 w-4" />
                        Quản trị
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="rounded-full bg-[#FFB5C5] text-white shadow-md hover:bg-[#FF9FB3]"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
