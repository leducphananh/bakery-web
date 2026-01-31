# Website Bán Bánh Ngọt - Tiệm Bánh Ngọt 🧁

Website thương mại điện tử bán bánh ngọt được xây dựng với Next.js, TypeScript và Supabase.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (Email/Password, Google, Facebook)
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Form**: React Hook Form + Zod

## 📋 Yêu Cầu Hệ Thống

- Node.js 18+
- npm hoặc yarn
- Tài khoản Supabase

## 🛠️ Cài Đặt

### 1. Clone dự án

```bash
git clone <repository-url>
cd bakery-web
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình Supabase

#### Tạo project trên Supabase:

1. Truy cập [https://supabase.com](https://supabase.com)
2. Tạo project mới
3. Lấy URL và Anon Key từ Project Settings > API

#### Cấu hình biến môi trường:

Tạo file `.env.local` ở thư mục gốc:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

#### Chạy migrations để tạo database schema:

1. Vào Supabase Dashboard > SQL Editor
2. Copy nội dung file `supabase/migrations/001_create_schema.sql` và execute
3. Copy nội dung file `supabase/migrations/002_seed_data.sql` và execute (optional - tạo dữ liệu mẫu)

### 4. Cấu hình Authentication Providers (Optional)

Để enable Google và Facebook login:

1. Vào Supabase Dashboard > Authentication > Providers
2. Enable Google và Facebook
3. Thêm OAuth credentials theo hướng dẫn

### 5. Cấu hình Storage

1. Vào Supabase Dashboard > Storage
2. Tạo bucket mới tên `cakes` (public)
3. Set policy cho phép upload (hoặc dùng policy có sẵn)

### 6. Tạo Admin User

Sau khi chạy migrations và đăng ký tài khoản đầu tiên:

1. Vào Supabase Dashboard > Table Editor > profiles
2. Tìm user vừa tạo và sửa `role` thành `admin`

Hoặc chạy SQL:

```sql
UPDATE profiles
SET role = 'admin'
WHERE id = 'YOUR_USER_ID_HERE';
```

### 7. Chạy development server

```bash
npm run dev
```

Website sẽ chạy tại [http://localhost:3000](http://localhost:3000)

## 📁 Cấu Trúc Dự Án

```
bakery-web/
├── app/
│   ├── admin/              # Trang quản trị
│   │   ├── cakes/          # Quản lý bánh
│   │   ├── orders/         # Quản lý đơn hàng
│   │   └── page.tsx        # Dashboard admin
│   ├── auth/               # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── callback/
│   ├── cart/               # Giỏ hàng
│   ├── checkout/           # Thanh toán
│   ├── orders/             # Đơn hàng của user
│   ├── products/           # Danh sách & chi tiết sản phẩm
│   ├── profile/            # Thông tin cá nhân
│   ├── components/         # React components
│   └── page.tsx            # Homepage
├── lib/
│   ├── supabase/           # Supabase clients & utilities
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   ├── middleware.ts   # Auth middleware
│   │   └── database.types.ts
│   └── context/            # React contexts
│       ├── AuthContext.tsx
│       └── CartContext.tsx
├── supabase/
│   └── migrations/         # Database migrations
└── middleware.ts           # Next.js middleware
```

## 🔐 Authentication & Authorization

### Roles:

- **user**: Người dùng thường - có thể xem sản phẩm, đặt hàng
- **admin**: Quản trị viên - toàn quyền CRUD sản phẩm, quản lý đơn hàng

### Row Level Security (RLS):

- Users chỉ xem được đơn hàng của mình
- Admins có thể xem và quản lý tất cả
- Sản phẩm có thể xem public nhưng chỉ admin mới CRUD được

## 💾 Database Schema

### Tables:

1. **profiles** - Thông tin người dùng
2. **cakes** - Sản phẩm bánh
3. **orders** - Đơn hàng
4. **order_items** - Chi tiết đơn hàng

Chi tiết schema xem trong `supabase/migrations/001_create_schema.sql`

## 🎨 Features

### User Features:

- ✅ Xem danh sách bánh với tìm kiếm
- ✅ Xem chi tiết sản phẩm
- ✅ Thêm vào giỏ hàng
- ✅ Checkout với xác thực thông tin
- ✅ Xem lịch sử đơn hàng
- ✅ Quản lý thông tin cá nhân
- ✅ Đăng nhập/Đăng ký (Email, Google, Facebook)

### Admin Features:

- ✅ Dashboard thống kê
- ✅ CRUD sản phẩm bánh
- ✅ Upload ảnh lên Supabase Storage
- ✅ Bật/tắt trạng thái sản phẩm
- ✅ Xem danh sách đơn hàng
- ✅ Cập nhật trạng thái đơn hàng
- ✅ Xem chi tiết đơn hàng

## 🚢 Deploy

### Vercel (Recommended):

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm environment variables
4. Deploy

### Environment Variables cho Production:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🧪 Testing

Để test các tính năng:

1. **User Flow**:
   - Đăng ký tài khoản mới
   - Browse sản phẩm
   - Thêm vào giỏ hàng
   - Checkout và tạo đơn hàng
   - Xem lịch sử đơn hàng

2. **Admin Flow**:
   - Đăng nhập với tài khoản admin
   - Tạo sản phẩm mới
   - Upload ảnh
   - Quản lý đơn hàng
   - Cập nhật trạng thái

## 📝 Notes

- Tất cả giá tiền hiển thị bằng VNĐ
- Phí vận chuyển mặc định: Miễn phí
- Trạng thái đơn hàng: pending → confirmed → shipping → completed
- Upload ảnh qua Supabase Storage bucket `cakes`

## 🤝 Contributing

Pull requests are welcome!

## 📄 License

MIT

## 👥 Contact

Mọi thắc mắc xin liên hệ: [your-email@example.com]
