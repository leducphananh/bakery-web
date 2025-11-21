import { Cake } from "lucide-react";
import { Button } from "../ui/button";

export function Navigation() {
  return (
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
  );
}
