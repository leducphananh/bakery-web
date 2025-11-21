import {
  Cake,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { getActiveCakes } from "./admin/cakes/actions";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ProductCard } from "./components/ProductCard";
import { ReviewCard } from "./components/ReviewCard";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

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
      {/* Decorative Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-10">
        <Cake className="absolute top-20 left-10 h-16 w-16 rotate-12 transform text-[#FFB5C5]" />
        <Heart className="absolute top-40 right-20 h-12 w-12 text-[#FFB5C5]" />
        <Cake className="absolute bottom-40 left-1/4 h-20 w-20 -rotate-12 transform text-[#D4A5A5]" />
        <Heart className="absolute right-1/3 bottom-20 h-14 w-14 rotate-45 transform text-[#FFB5C5]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <Cake className="h-8 w-8 text-[#FFB5C5]" />
              <span
                className="text-2xl text-[#8B5A3C]"
                style={{ fontFamily: "var(--font-pacifico), cursive" }}
              >
                Milove
              </span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#home"
                className="text-[#8B5A3C] transition-colors hover:text-[#FFB5C5]"
              >
                Trang chủ
              </a>
              <a
                href="#products"
                className="text-[#8B5A3C] transition-colors hover:text-[#FFB5C5]"
              >
                Sản phẩm
              </a>
              <a
                href="#about"
                className="text-[#8B5A3C] transition-colors hover:text-[#FFB5C5]"
              >
                Về chúng tôi
              </a>
              <a
                href="#reviews"
                className="text-[#8B5A3C] transition-colors hover:text-[#FFB5C5]"
              >
                Đánh giá
              </a>
              <Button className="rounded-full bg-[#FFB5C5] text-white shadow-md hover:bg-[#FF9FB3]">
                Đặt hàng ngay
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 text-center md:order-1 md:text-left">
              <h1
                className="mb-6 text-[#8B5A3C]"
                style={{
                  fontFamily: "var(--font-pacifico), cursive",
                  fontSize: "3.5rem",
                  lineHeight: "1.2",
                }}
              >
                Nướng Bằng Tình Yêu, Phục Vụ Bằng Niềm Vui
              </h1>
              <p className="mb-8 text-xl text-gray-600">
                Thưởng thức các loại bánh kem, bánh ngọt và món tráng miệng tươi
                ngon được làm từ những nguyên liệu tuyển chọn. Mỗi món đều là
                một kiệt tác!
              </p>
              <Button
                size="lg"
                className="rounded-full bg-[#FFB5C5] px-8 py-6 text-lg text-white shadow-lg hover:bg-[#FF9FB3]"
              >
                Mua ngay
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="transform overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1693040743049-71cd4630ab5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjYWtlcyUyMHBhc3RyaWVzfGVufDF8fHx8MTc2MzAwNTA3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Delicious cakes and pastries"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
              Sản Phẩm Bán Chạy
            </h2>
            <p className="text-lg text-gray-600">
              Thưởng thức những món bánh được yêu thích nhất
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section
        id="about"
        className="relative bg-white/50 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1595641190867-138b14a23a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmFrZXJ5JTIwc2hvcHxlbnwxfHx8fDE3NjMwMDUwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our cozy bakery"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2
                className="mb-6 text-[#8B5A3C]"
                style={{
                  fontFamily: "var(--font-pacifico), cursive",
                  fontSize: "2.5rem",
                }}
              >
                Câu Chuyện Ngọt Ngào
              </h2>
              <p className="mb-4 text-lg text-gray-600">
                Milove được thành lập vào năm 2015 như một tiệm bánh gia đình
                nhỏ với ước mơ lớn: mang niềm vui đến cho mỗi khách hàng thông
                qua những món bánh thủ công tuyệt ngon.
              </p>
              <p className="mb-4 text-lg text-gray-600">
                Mỗi buổi sáng, chúng tôi thức dậy trước bình minh để chuẩn bị
                những mẻ bánh tươi ngon, sử dụng công thức truyền thống được
                truyền qua nhiều thế hệ. Chúng tôi tin vào việc chỉ sử dụng
                nguyên liệu tốt nhất và nướng mọi thứ bằng tình yêu.
              </p>
              <p className="text-lg text-gray-600">
                Hôm nay, chúng tôi tự hào là tiệm bánh yêu thích trong khu phố,
                mang đến nụ cười qua từng món ngọt. Cảm ơn bạn đã đồng hành cùng
                chúng tôi!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2
              className="mb-4 text-[#8B5A3C]"
              style={{
                fontFamily: "var(--font-pacifico), cursive",
                fontSize: "2.5rem",
              }}
            >
              Đánh Giá Của Khách Hàng
            </h2>
            <p className="text-lg text-gray-600">
              Hãy nghe những gì khách hàng nói về chúng tôi!
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                avatar={review.avatar}
                rating={review.rating}
                review={review.review}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative bg-linear-to-r from-[#FFB5C5] to-[#FFD1DC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="mb-4 text-white"
            style={{
              fontFamily: "var(--font-pacifico), cursive",
              fontSize: "2rem",
            }}
          >
            Cùng Ngọt Ngào Với Chúng Tôi!
          </h2>
          <p className="mb-6 text-lg text-white/90">
            Đăng ký nhận tin để nhận ưu đãi độc quyền và mẹo làm bánh
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              className="rounded-full border-0 bg-white px-6 shadow-md"
            />
            <Button className="rounded-full bg-[#8B5A3C] px-8 text-white shadow-md hover:bg-[#6B4A2C]">
              Đăng ký
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-white/80 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-[#8B5A3C]">Liên Hệ</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-[#FFB5C5]" />
                  <span>123 Đường Ngọt Ngào, Quận Bánh Ngọt</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-5 w-5 text-[#FFB5C5]" />
                  <span>0123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-5 w-5 text-[#FFB5C5]" />
                  <span>hello@milove.vn</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-[#8B5A3C]">Liên Kết</h3>
              <div className="space-y-2">
                <a
                  href="#home"
                  className="block text-gray-600 transition-colors hover:text-[#FFB5C5]"
                >
                  Trang chủ
                </a>
                <a
                  href="#products"
                  className="block text-gray-600 transition-colors hover:text-[#FFB5C5]"
                >
                  Sản phẩm
                </a>
                <a
                  href="#about"
                  className="block text-gray-600 transition-colors hover:text-[#FFB5C5]"
                >
                  Về chúng tôi
                </a>
                <a
                  href="#reviews"
                  className="block text-gray-600 transition-colors hover:text-[#FFB5C5]"
                >
                  Đánh giá
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-4 text-[#8B5A3C]">Theo Dõi Chúng Tôi</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB5C5] text-white shadow-md transition-colors hover:bg-[#FF9FB3]"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB5C5] text-white shadow-md transition-colors hover:bg-[#FF9FB3]"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB5C5] text-white shadow-md transition-colors hover:bg-[#FF9FB3]"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600">
              © 2025 Milove. Được làm với{" "}
              <Heart className="inline-block h-4 w-4 fill-[#FFB5C5] text-[#FFB5C5]" />{" "}
              dành cho những người yêu thích bánh ngọt
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
