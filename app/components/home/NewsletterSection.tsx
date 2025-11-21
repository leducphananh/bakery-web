import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function NewsletterSection() {
  return (
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
  );
}
