import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
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
  );
}
