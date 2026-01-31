import { createClient } from "@/lib/supabase/server";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { AboutSection } from "./components/home/AboutSection";
import { DecorativeBackground } from "./components/home/DecorativeBackground";
import { Footer } from "./components/home/Footer";
import { HeroSection } from "./components/home/HeroSection";
import { Navigation } from "./components/home/Navigation";
import { NewsletterSection } from "./components/home/NewsletterSection";
import { ReviewCard } from "./components/home/ReviewCard";
import { Button } from "./components/ui/button";

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured cakes
  const { data: cakes } = await supabase
    .from("cakes")
    .select("*")
    .eq("is_available", true)
    .limit(6)
    .order("created_at", { ascending: false });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF9E5]">
      <DecorativeBackground />
      <Navigation />
      <main className="relative">
        <HeroSection />

        {/* Featured Products Section */}
        <section id="products" className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2
                className="mb-4 text-[#8B5A3C]"
                style={{
                  fontFamily: "var(--font-pacifico), cursive",
                  fontSize: "2.5rem",
                }}
              >
                Bánh Nổi Bật
              </h2>
              <p className="text-lg text-gray-600">
                Thưởng thức những món bánh được yêu thích nhất
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cakes?.map((cake) => (
                <Link key={cake.id} href={`/products/${cake.id}`}>
                  <div className="group transform overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="aspect-square overflow-hidden">
                      {cake.image_url ? (
                        <img
                          src={cake.image_url}
                          alt={cake.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                          <span className="text-8xl">🧁</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="mb-3 text-xl font-semibold text-[#8B5A3C]">
                        {cake.name}
                      </h3>
                      {cake.description && (
                        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                          {cake.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-xl font-semibold text-[#FFB5C5]">
                            {Number(cake.price).toLocaleString("vi-VN")}₫
                          </span>
                          {cake.original_price &&
                            Number(cake.original_price) !==
                              Number(cake.price) && (
                              <span className="text-sm text-gray-400 line-through">
                                {Number(cake.original_price).toLocaleString(
                                  "vi-VN",
                                )}
                                ₫
                              </span>
                            )}
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full bg-[#FFB5C5] text-white shadow-md hover:bg-[#FF9FB3]"
                        >
                          <ShoppingCart className="mr-1 h-4 w-4" />
                          Xem
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="rounded-full bg-[#FFB5C5] px-8 py-6 text-lg text-white shadow-lg hover:bg-[#FF9FB3]"
                >
                  Xem Tất Cả Sản Phẩm
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <AboutSection />

        {/* Reviews Section */}
        <section className="relative bg-gradient-to-br from-[#FFF5F7] to-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2
                className="mb-4 text-[#8B5A3C]"
                style={{
                  fontFamily: "var(--font-pacifico), cursive",
                  fontSize: "2.5rem",
                }}
              >
                Khách Hàng Nói Gì
              </h2>
              <p className="text-lg text-gray-600">
                Những đánh giá chân thực từ khách hàng
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <ReviewCard
                rating={5}
                review="Bánh rất ngon và tươi! Giao hàng nhanh chóng. Tôi sẽ đặt hàng lại."
                author="Nguyễn Thị Hương"
                date="15 tháng 1, 2026"
              />
              <ReviewCard
                rating={5}
                review="Chất lượng tuyệt vời, giá cả hợp lý. Dịch vụ khách hàng chu đáo."
                author="Trần Văn Nam"
                date="20 tháng 1, 2026"
              />
              <ReviewCard
                rating={5}
                review="Bánh sinh nhật đặt ở đây rất đẹp và ngon. Cả nhà đều thích!"
                author="Lê Thị Mai"
                date="28 tháng 1, 2026"
              />
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
