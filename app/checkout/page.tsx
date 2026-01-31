"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { user, profile, refreshProfile } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/checkout");
      return;
    }

    if (items.length === 0) {
      router.push("/cart");
      return;
    }

    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [user, items, profile, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);

    try {
      // Update profile if info is missing
      if (!profile?.phone || !profile?.address) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            full_name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
          })
          .eq("id", user.id);

        if (profileError) throw profileError;
        await refreshProfile();
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_price: totalPrice,
          status: "pending",
          customer_name: formData.fullName,
          customer_phone: formData.phone,
          customer_address: formData.address,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        cake_id: item.id,
        quantity: item.quantity,
        price: item.price,
        cake_name: item.name,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast.success("Đặt hàng thành công!");
      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error(error.message || "Đặt hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!user || items.length === 0) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold">Thanh toán</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="mb-6 text-xl font-bold">Thông tin giao hàng</h2>

                {(!profile?.phone || !profile?.address) && (
                  <Alert className="mb-6">
                    <AlertDescription>
                      Vui lòng cập nhật thông tin giao hàng để tiếp tục
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>
                </form>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20 p-6">
                <h2 className="mb-4 text-xl font-bold">Đơn hàng của bạn</h2>

                <div className="mb-4 max-h-96 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b pb-3">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded bg-gray-200">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-2xl">🧁</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.price.toLocaleString("vi-VN")}₫ x{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t pt-3">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">
                      {totalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
