import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
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
              ngon được làm từ những nguyên liệu tuyển chọn. Mỗi món đều là một
              kiệt tác!
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
  );
}
