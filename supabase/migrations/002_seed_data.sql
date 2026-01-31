-- Seed data for cakes
INSERT INTO cakes (name, description, price, image_url, is_available) VALUES
('Bánh Gato Dâu Tươi', 'Bánh gato mềm mịn với kem tươi và dâu tây tươi ngon, thích hợp cho các bữa tiệc sinh nhật', 350000, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800', true),
('Bánh Tiramisu', 'Bánh Tiramisu Ý truyền thống với hương vị cà phê đậm đà và lớp kem mascarpone mềm mịn', 280000, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800', true),
('Bánh Chocolate Truffle', 'Bánh socola đắng cao cấp phủ ganache chocolate, dành cho người yêu thích vị đắng thanh', 320000, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800', true),
('Bánh Red Velvet', 'Bánh nhung đỏ với kem cheese mịn màng, vị ngọt nhẹ và màu sắc bắt mắt', 300000, 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800', true),
('Bánh Cheesecake Chanh Dây', 'Bánh phô mai kem với lớp chanh dây chua ngọt, thanh mát và thơm ngon', 290000, 'https://images.unsplash.com/photo-1533134242116-8c3e8f6bf762?w=800', true),
('Bánh Mousse Xoài', 'Bánh mousse xoài tươi mát, nhẹ nhàng với hương vị nhiệt đới', 270000, 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800', true),
('Bánh Macaron Pháp', 'Set 12 bánh macaron nhiều màu sắc và hương vị khác nhau từ Pháp', 450000, 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800', true),
('Bánh Bông Lan Trứng Muối', 'Bánh bông lan mềm xốp với nhân trứng muối béo ngậy, thơm lừng', 180000, 'https://images.unsplash.com/photo-1557925923-33b27c24cc67?w=800', true);

-- Create admin user (you'll need to update this with actual user ID after creating account)
-- First create an admin account manually in Supabase Auth Dashboard
-- Then update the role with the following query:
-- UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID_HERE';
