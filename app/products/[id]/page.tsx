"use client";

import { DecorativeBackground } from "@/app/components/home/DecorativeBackground";
import { Footer } from "@/app/components/home/Footer";
import { Navigation } from "@/app/components/home/Navigation";
import { Button } from "@/app/components/ui/button";
import { useCart } from "@/lib/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Clock,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Cake {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  is_available: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [cake, setCake] = useState<Cake | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const supabase = createClient();

  useEffect(() => {
    if (params.id) {
      fetchCake();
    }
  }, [params.id]);

  const fetchCake = async () => {
    try {
      const { data, error } = await supabase
        .from("cakes")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;
      setCake(data);
    } catch (error) {
      console.error("Error fetching cake:", error);
      toast.error("Không thể tải thông tin bánh");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (cake) {
      addItem({
        id: cake.id,
        name: cake.name,
        price: cake.price,
        image_url: cake.image_url,
      });
      toast.success(`Đã thêm ${cake.name} vào giỏ hàng`);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF9E5]">
        <DecorativeBackground />
        <Navigation />
        <div className="relative flex min-h-[60vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#FFB5C5] border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF9E5]">
        <DecorativeBackground />
        <Navigation />
        <div className="relative flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-6 text-8xl">😢</div>
            <h1
              className="mb-4 text-[#8B5A3C]"
              style={{
                fontFamily: "var(--font-pacifico), cursive",
                fontSize: "2.5rem",
              }}
            >
              Không Tìm Thấy Sản Phẩm
            </h1>
            <Button
              onClick={() => router.push("/products")}
              className="rounded-full bg-[#FFB5C5] px-8 py-6 text-lg text-white shadow-lg hover:bg-[#FF9FB3]"
            >
              Về Trang Sản Phẩm
            </Button>
          </div>
        </div>
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
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 rounded-full text-[#8B5A3C] hover:bg-[#FFB5C5]/10"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Quay Lại
          </Button>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <div className="aspect-square overflow-hidden bg-gray-100">
                {cake.image_url ? (
                  <img
                    src={cake.image_url}
                    alt={cake.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <span className="text-9xl">🧁</span>
                  </div>
                )}
              </div>
              {!cake.is_available && (
                <div className="bg-red-50 px-6 py-4 text-center">
                  <span className="font-semibold text-red-600">
                    ⚠️ Sản phẩm hiện đang hết hàng
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1
                  className="mb-4 text-[#8B5A3C]"
                  style={{
                    fontFamily: "var(--font-pacifico), cursive",
                    fontSize: "3rem",
                    lineHeight: "1.2",
                  }}
                >
                  {cake.name}
                </h1>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#FFD700] text-[#FFD700]"
                    />
                  ))}
                  <span className="text-gray-600">(48 đánh giá)</span>
                </div>
              </div>

              {/* Price */}
              <div className="rounded-3xl bg-gradient-to-r from-[#FFB5C5]/10 to-[#FFF5F7] p-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-[#FFB5C5]">
                    {Number(cake.price).toLocaleString("vi-VN")}₫
                  </span>
                  {cake.original_price &&
                    Number(cake.original_price) !== Number(cake.price) && (
                      <span className="text-2xl text-gray-400 line-through">
                        {Number(cake.original_price).toLocaleString("vi-VN")}₫
                      </span>
                    )}
                </div>
                {cake.original_price &&
                  Number(cake.original_price) !== Number(cake.price) && (
                    <div className="mt-2 inline-block rounded-full bg-red-500 px-4 py-1 text-sm font-semibold text-white">
                      Giảm{" "}
                      {Math.round(
                        ((Number(cake.original_price) - Number(cake.price)) /
                          Number(cake.original_price)) *
                          100,
                      )}
                      %
                    </div>
                  )}
              </div>

              {/* Description */}
              {cake.description && (
                <div className="rounded-3xl bg-white p-6 shadow-md">
                  <h2 className="mb-4 text-2xl font-semibold text-[#8B5A3C]">
                    Mô Tả Sản Phẩm
                  </h2>
                  <p className="leading-relaxed whitespace-pre-line text-gray-600">
                    {cake.description}
                  </p>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                size="lg"
                className="w-full rounded-full bg-[#FFB5C5] py-7 text-xl text-white shadow-lg hover:bg-[#FF9FB3]"
                onClick={handleAddToCart}
                disabled={!cake.is_available}
              >
                <ShoppingCart className="mr-3 h-6 w-6" />
                {cake.is_available ? "Thêm Vào Giỏ Hàng" : "Hết Hàng"}
              </Button>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 text-center shadow-md">
                  <Truck className="mx-auto mb-2 h-8 w-8 text-[#FFB5C5]" />
                  <p className="text-sm font-semibold text-[#8B5A3C]">
                    Giao hàng 2h
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-center shadow-md">
                  <Shield className="mx-auto mb-2 h-8 w-8 text-[#FFB5C5]" />
                  <p className="text-sm font-semibold text-[#8B5A3C]">
                    Đảm bảo chất lượng
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-center shadow-md">
                  <Clock className="mx-auto mb-2 h-8 w-8 text-[#FFB5C5]" />
                  <p className="text-sm font-semibold text-[#8B5A3C]">
                    Tươi mỗi ngày
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
