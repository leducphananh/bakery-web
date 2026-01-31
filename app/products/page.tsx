"use client";

import CakeCard from "@/app/components/CakeCard";
import { DecorativeBackground } from "@/app/components/home/DecorativeBackground";
import { Footer } from "@/app/components/home/Footer";
import { Navigation } from "@/app/components/home/Navigation";
import { Input } from "@/app/components/ui/input";
import { useCart } from "@/lib/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Cake {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean | null;
}

export default function ProductsPage() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [filteredCakes, setFilteredCakes] = useState<Cake[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const supabase = createClient();

  useEffect(() => {
    fetchCakes();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = cakes.filter((cake) =>
        cake.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredCakes(filtered);
    } else {
      setFilteredCakes(cakes);
    }
  }, [search, cakes]);

  const fetchCakes = async () => {
    try {
      const { data, error } = await supabase
        .from("cakes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCakes(data || []);
      setFilteredCakes(data || []);
    } catch (error) {
      console.error("Error fetching cakes:", error);
      toast.error("Không thể tải danh sách bánh");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (cake: Cake) => {
    addItem({
      id: cake.id,
      name: cake.name,
      price: cake.price,
      image_url: cake.image_url,
    });
    toast.success(`Đã thêm ${cake.name} vào giỏ hàng`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF9E5]">
      <DecorativeBackground />
      <Navigation />

      <main className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1
              className="mb-4 text-[#8B5A3C]"
              style={{
                fontFamily: "var(--font-pacifico), cursive",
                fontSize: "3rem",
              }}
            >
              Sản Phẩm Của Chúng Tôi
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Khám phá bộ sưu tập bánh ngọt đa dạng và thơm ngon
            </p>

            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm bánh..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-full border-2 border-[#FFB5C5]/20 py-6 pr-4 pl-12 text-lg shadow-sm focus:border-[#FFB5C5] focus:ring-[#FFB5C5]"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-[400px] animate-pulse rounded-3xl bg-white/50 shadow-md"
                />
              ))}
            </div>
          ) : filteredCakes.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCakes.map((cake) => (
                <CakeCard
                  key={cake.id}
                  {...cake}
                  onAddToCart={() => handleAddToCart(cake)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white/50 py-16 text-center shadow-md">
              <div className="mb-4 text-6xl">🔍</div>
              <p className="text-xl text-gray-600">
                {search ? "Không tìm thấy bánh nào" : "Chưa có sản phẩm nào"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
