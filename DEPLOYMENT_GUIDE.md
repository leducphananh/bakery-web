# 🚀 Hướng Dẫn Triển Khai Chi Tiết

## 📦 Bước 1: Setup Supabase

### 1.1 Tạo Project

1. Đăng nhập [Supabase](https://supabase.com)
2. Click "New Project"
3. Điền thông tin:
   - Project name: `bakery-web`
   - Database Password: (lưu lại password này)
   - Region: Chọn gần nhất (Singapore cho VN)
4. Click "Create new project"

### 1.2 Lấy API Keys

1. Vào Project Settings > API
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...`

### 1.3 Tạo Database Schema

1. Vào SQL Editor trong Supabase Dashboard
2. Click "New query"
3. Copy toàn bộ nội dung file `supabase/migrations/001_create_schema.sql`
4. Paste vào SQL Editor và click "Run"
5. Kiểm tra:
   - Vào Table Editor, bạn sẽ thấy 4 tables: `profiles`, `cakes`, `orders`, `order_items`
   - Vào Authentication > Policies, kiểm tra RLS policies đã được tạo

### 1.4 Seed Data (Optional)

1. Tạo query mới trong SQL Editor
2. Copy nội dung file `supabase/migrations/002_seed_data.sql`
3. Run để tạo dữ liệu mẫu (8 sản phẩm bánh)

### 1.5 Setup Storage

1. Vào Storage trong Supabase Dashboard
2. Click "Create bucket"
3. Tên bucket: `cakes`
4. Public bucket: ✅ ON
5. Click "Create bucket"

**Set Policy cho bucket:**

```sql
-- Allow public read
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'cakes');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cakes');
```

### 1.6 Setup Authentication Providers

#### Email Authentication (Mặc định đã enable)

- Vào Authentication > Providers > Email
- Confirm URL: `http://localhost:3000/auth/callback` (dev)
- Site URL: `http://localhost:3000` (dev)

#### Google OAuth (Optional)

1. Vào [Google Cloud Console](https://console.cloud.google.com)
2. Tạo OAuth 2.0 credentials
3. Authorized redirect URIs:
   - `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
4. Copy Client ID và Client Secret
5. Paste vào Supabase > Authentication > Providers > Google

#### Facebook OAuth (Optional)

1. Vào [Facebook Developers](https://developers.facebook.com)
2. Tạo app và setup Facebook Login
3. Valid OAuth Redirect URIs:
   - `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
4. Copy App ID và App Secret
5. Paste vào Supabase > Authentication > Providers > Facebook

## 💻 Bước 2: Setup Local Development

### 2.1 Clone & Install

```bash
# Clone repository (nếu có)
git clone <your-repo-url>
cd bakery-web

# Hoặc nếu đã có folder
cd bakery-web

# Install dependencies
npm install
```

### 2.2 Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Lưu ý**: Thay `xxxxx` và `eyJhbGc...` bằng giá trị thực từ Supabase của bạn.

### 2.3 Run Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## 👤 Bước 3: Tạo Admin User

### Option 1: Via Supabase Dashboard

1. Đăng ký tài khoản mới qua UI: `http://localhost:3000/auth/register`
2. Vào Supabase Dashboard > Table Editor > `profiles`
3. Tìm user vừa tạo
4. Click edit và đổi `role` thành `admin`
5. Save

### Option 2: Via SQL

```sql
-- Sau khi đăng ký, chạy SQL này (thay USER_ID bằng ID thật)
UPDATE profiles
SET role = 'admin'
WHERE id = 'YOUR_USER_ID_HERE';

-- Hoặc update bằng email
UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'your-email@example.com'
);
```

## 🧪 Bước 4: Testing

### 4.1 Test User Flow

1. **Đăng ký tài khoản mới**
   - Vào `/auth/register`
   - Điền thông tin và đăng ký
   - Check email để verify (nếu bật email confirmation)

2. **Browse và mua hàng**
   - Vào `/products` xem danh sách
   - Click vào 1 sản phẩm để xem chi tiết
   - Click "Thêm vào giỏ hàng"
   - Vào `/cart` kiểm tra giỏ hàng
   - Click "Thanh toán"
   - Điền thông tin giao hàng và đặt hàng

3. **Xem đơn hàng**
   - Vào `/orders` để xem lịch sử
   - Click vào đơn hàng để xem chi tiết

4. **Cập nhật profile**
   - Vào `/profile`
   - Cập nhật thông tin cá nhân

### 4.2 Test Admin Flow

1. **Đăng nhập admin**
   - Logout user hiện tại
   - Đăng nhập với tài khoản admin đã tạo
   - Sẽ tự động redirect đến `/admin`

2. **Quản lý sản phẩm**
   - Vào `/admin/cakes`
   - Thêm sản phẩm mới
   - Upload ảnh (test Supabase Storage)
   - Edit sản phẩm
   - Toggle trạng thái available/unavailable
   - Xóa sản phẩm (test với 1 sp không dùng)

3. **Quản lý đơn hàng**
   - Vào `/admin/orders`
   - Xem danh sách đơn hàng
   - Lọc theo trạng thái
   - Cập nhật trạng thái đơn hàng
   - Xem chi tiết đơn hàng

### 4.3 Test Security (RLS)

**Test 1: User không thể xem đơn của người khác**

```sql
-- Trong Supabase SQL Editor, với user A login
SELECT * FROM orders WHERE user_id != auth.uid();
-- Kết quả: Empty (good!)
```

**Test 2: User không thể tạo/sửa/xóa sản phẩm**

- Login với user thường
- Thử access `/admin/cakes` → Should redirect về home
- Hoặc test via SQL:

```sql
-- User thường không thể insert cake
INSERT INTO cakes (name, price) VALUES ('Test', 100000);
-- Kết quả: Permission denied (good!)
```

**Test 3: Admin có toàn quyền**

- Login admin → Có thể CRUD products và xem all orders

## 🚢 Bước 5: Deploy lên Production

### 5.1 Deploy lên Vercel

1. Push code lên GitHub (nếu chưa có):

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. Vào [Vercel](https://vercel.com)
3. Click "Import Project"
4. Connect với GitHub repo
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```
6. Click "Deploy"

### 5.2 Update Supabase Settings cho Production

1. Vào Supabase > Authentication > URL Configuration
2. Thêm production URL:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/auth/callback`

3. Update OAuth providers (nếu dùng):
   - Google: Add production callback URL
   - Facebook: Add production callback URL

## 🐛 Troubleshooting

### Lỗi: "Invalid credentials"

- Kiểm tra lại SUPABASE_URL và ANON_KEY
- Đảm bảo không có space thừa trong .env.local

### Lỗi: "Row Level Security policy violation"

- Kiểm tra RLS policies đã được tạo đúng
- Verify user đã login
- Check role của user

### Lỗi: "relation does not exist"

- Tables chưa được tạo
- Re-run migration SQL

### Lỗi khi upload ảnh

- Kiểm tra bucket `cakes` đã tạo chưa
- Verify bucket là public
- Check storage policies

### Lỗi OAuth (Google/Facebook)

- Verify redirect URIs khớp
- Check client ID và secret
- Ensure OAuth app được approve (production)

## 📊 Monitoring

### Check Logs trong Supabase:

- Authentication logs: Auth > Logs
- Database logs: Database > Logs
- Storage logs: Storage > Usage

### Check Analytics:

- Supabase > Dashboard: User growth, API usage
- Vercel Analytics: Page views, performance

## 🔐 Security Checklist

- ✅ RLS enabled trên tất cả tables
- ✅ API keys được giữ trong .env.local (không commit)
- ✅ Middleware protect admin routes
- ✅ Input validation (form validation)
- ✅ SQL injection protected (Supabase client tự động)
- ✅ Storage có policies đúng

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

## 💡 Tips

1. **Development**: Luôn test với sample data trước
2. **Testing**: Test cả happy path và error cases
3. **Security**: Verify RLS policies đúng trước khi production
4. **Performance**: Optimize images (Next.js tự động optimize)
5. **SEO**: Thêm metadata cho mỗi page

## 🎉 Done!

Website đã sẵn sàng. Enjoy coding! 🚀
