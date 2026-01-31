export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-[var(--font-pacifico)] font-bold">
              🧁 Tiệm Bánh Ngọt
            </h3>
            <p className="text-gray-400">
              Mang đến những chiếc bánh thơm ngon, tươi mới mỗi ngày
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Liên hệ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 123 Đường ABC, Quận 1, TP.HCM</li>
              <li>📞 0123 456 789</li>
              <li>✉️ contact@tiembanhngot.vn</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Giờ mở cửa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Thứ 2 - Thứ 6: 8:00 - 21:00</li>
              <li>Thứ 7 - CN: 8:00 - 22:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Tiệm Bánh Ngọt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
