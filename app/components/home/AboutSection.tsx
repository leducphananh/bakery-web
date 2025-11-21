import { ImageWithFallback } from "../figma/ImageWithFallback";

export function AboutSection() {
  return (
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
              Milove được thành lập vào năm 2015 như một tiệm bánh gia đình nhỏ
              với ước mơ lớn: mang niềm vui đến cho mỗi khách hàng thông qua
              những món bánh thủ công tuyệt ngon.
            </p>
            <p className="mb-4 text-lg text-gray-600">
              Mỗi buổi sáng, chúng tôi thức dậy trước bình minh để chuẩn bị
              những mẻ bánh tươi ngon, sử dụng công thức truyền thống được
              truyền qua nhiều thế hệ. Chúng tôi tin vào việc chỉ sử dụng nguyên
              liệu tốt nhất và nướng mọi thứ bằng tình yêu.
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
  );
}
