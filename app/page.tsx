import { getActiveCakes } from "./admin/cakes/actions";
import { AboutSection } from "./components/home/AboutSection";
import { DecorativeBackground } from "./components/home/DecorativeBackground";
import { Footer } from "./components/home/Footer";
import { HeroSection } from "./components/home/HeroSection";
import { Navigation } from "./components/home/Navigation";
import { NewsletterSection } from "./components/home/NewsletterSection";
import { ProductsSection } from "./components/home/ProductsSection";
import { ReviewsSection } from "./components/home/ReviewsSection";

export default async function Home() {
  const activeCakes = await getActiveCakes();

  const products = activeCakes.map((cake) => ({
    id: cake.id,
    name: cake.name,
    price: `${cake.price.toLocaleString("vi-VN")}₫`,
    originalPrice: cake.originalPrice
      ? `${cake.originalPrice.toLocaleString("vi-VN")}₫`
      : undefined,
    image: cake.image || "",
  }));

  const reviews = [
    {
      id: 1,
      name: "Nguyễn Thảo My",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      review:
        "Bánh ở đây ngon tuyệt vời! Mỗi miếng bánh đều như thiên đường. Đây là tiệm bánh yêu thích của mình cho mọi dịp đặc biệt!",
    },
    {
      id: 2,
      name: "Trần Minh Khôi",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      review:
        "Bánh tươi ngon và được làm rất tỉ mỉ. Bánh socola là món mình thích nhất. Rất đáng để thử!",
    },
    {
      id: 3,
      name: "Lê Hương Giang",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      review:
        "Milove chưa bao giờ làm mình thất vọng! Chất lượng và hương vị luôn tuyệt hảo. Yêu quá!",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FFF5E6] to-[#FFE9F0]">
      <DecorativeBackground />
      <Navigation />
      <HeroSection />
      <ProductsSection products={products} />
      <AboutSection />
      <ReviewsSection reviews={reviews} />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
