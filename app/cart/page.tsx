"use client";

import { DecorativeBackground } from "@/app/components/home/DecorativeBackground";
import { Footer } from "@/app/components/home/Footer";
import { Navigation } from "@/app/components/home/Navigation";
import { Button } from "@/app/components/ui/button";
import { useCart } from "@/lib/context/CartContext";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF9E5]">
        <DecorativeBackground />
        <Navigation />
        <main className="relative flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-6 text-8xl">🛒</div>
            <h2
              className="mb-4 text-[#8B5A3C]"
              style={{
                fontFamily: "var(--font-pacifico), cursive",
                fontSize: "2.5rem",
              }}
            >
              Giỏ Hàng Trống
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="rounded-full bg-[#FFB5C5] px-8 py-6 text-lg text-white shadow-lg hover:bg-[#FF9FB3]"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Tiếp Tục Mua Sắm
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF9E5]">
      <DecorativeBackground />
      <Navigation />

      <main className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1
            className="mb-12 text-center text-[#8B5A3C]"
            style={{
              fontFamily: "var(--font-pacifico), cursive",
              fontSize: "3rem",
            }}
          >
            Giỏ Hàng Của Bạn
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-3xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl"
                >
                  <div className="flex gap-6">
                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-5xl">🧁</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="mb-2 text-xl font-semibold text-[#8B5A3C]">
                          {item.name}
                        </h3>
                        <p className="text-2xl font-bold text-[#FFB5C5]">
                          {item.price.toLocaleString("vi-VN")}₫
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="h-10 w-10 rounded-full border-2 border-[#FFB5C5] hover:bg-[#FFB5C5] hover:text-white"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center text-lg font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-10 w-10 rounded-full border-2 border-[#FFB5C5] hover:bg-[#FFB5C5] hover:text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-10 w-10 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 overflow-hidden rounded-3xl bg-white p-8 shadow-lg">
                <h2
                  className="mb-6 text-[#8B5A3C]"
                  style={{
                    fontFamily: "var(--font-pacifico), cursive",
                    fontSize: "1.75rem",
                  }}
                >
                  Tổng Đơn Hàng
                </h2>

                <div className="mb-8 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-semibold">
                      {totalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-semibold text-green-600">
                      Miễn phí
                    </span>
                  </div>
                  <div className="flex justify-between border-t-2 border-gray-200 pt-4 text-xl">
                    <span className="font-bold text-[#8B5A3C]">Tổng cộng:</span>
                    <span className="font-bold text-[#FFB5C5]">
                      {totalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="mb-4 w-full rounded-full bg-[#FFB5C5] py-6 text-lg text-white shadow-lg hover:bg-[#FF9FB3]"
                  onClick={() => router.push("/checkout")}
                >
                  Thanh toán
                </Button>

                <Link href="/products">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full border-2 border-[#FFB5C5] py-6 text-lg text-[#8B5A3C] hover:bg-[#FFB5C5]/10"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
