"use client";

import { DecorativeBackground } from "@/app/components/home/DecorativeBackground";
import { Footer } from "@/app/components/home/Footer";
import { Navigation } from "@/app/components/home/Navigation";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Calendar, MapPin, Package, Phone, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  cake_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  total_price: number;
  status: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  created_at: string | null;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  shipping: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<string, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (params.id) {
      fetchOrderDetail();
    }
  }, [user, params.id, router]);

  const fetchOrderDetail = async () => {
    if (!user) return;

    try {
      if (!params.id || typeof params.id !== "string") {
        throw new Error("Invalid order ID");
      }

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", user.id)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", params.id);

      if (itemsError) throw itemsError;
      setItems(itemsData || []);
    } catch (error) {
      console.error("Error fetching order:", error);
      toast.error("Không thể tải thông tin đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="relative min-h-screen">
        <DecorativeBackground />
        <Navigation />
        <div className="relative z-10 flex min-h-[60vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#FFB5C5] border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="relative min-h-screen">
        <DecorativeBackground />
        <Navigation />
        <div className="relative z-10 flex min-h-[60vh] items-center justify-center px-4">
          <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600">
              <Package className="h-12 w-12 text-white" />
            </div>
            <h1 className="mb-4 font-pacifico text-3xl text-[#8B5A3C]">
              Không tìm thấy đơn hàng
            </h1>
            <Button 
              onClick={() => router.push("/orders")}
              className="mt-4 rounded-full bg-gradient-to-r from-[#FFB5C5] to-[#FF8FAB] px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
            >
              Về danh sách đơn hàng
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <DecorativeBackground />
      <Navigation />

      <main className="relative z-10 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 rounded-full transition-colors hover:bg-pink-50 hover:text-[#FFB5C5]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>

          <div className="space-y-6">
            {/* Header */}
            <div className="rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB5C5] to-[#FF8FAB]">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="font-pacifico text-3xl text-[#8B5A3C]">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </h1>
                </div>
                <Badge className={`${statusColors[order.status]} rounded-full border-2 px-4 py-2 text-base font-semibold`}>
                  {statusLabels[order.status]}
                </Badge>
              </div>
            </div>

            {/* Order Info */}
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#8B5A3C]">
                <Package className="h-6 w-6 text-[#FFB5C5]" />
                Thông tin đơn hàng
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 text-[#FFB5C5]" />
                    <span>Ngày đặt</span>
                  </div>
                  <p className="font-semibold text-[#8B5A3C]">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="h-4 w-4 text-[#FFB5C5]" />
                    <span>Người nhận</span>
                  </div>
                  <p className="font-semibold text-[#8B5A3C]">{order.customer_name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="h-4 w-4 text-[#FFB5C5]" />
                    <span>Số điện thoại</span>
                  </div>
                  <p className="font-semibold text-[#8B5A3C]">{order.customer_phone}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-[#FFB5C5]" />
                    <span>Địa chỉ giao hàng</span>
                  </div>
                  <p className="font-semibold text-[#8B5A3C]">{order.customer_address}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#8B5A3C]">
                <Package className="h-6 w-6 text-[#FFB5C5]" />
                Sản phẩm
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border-2 border-gray-100 p-4 transition-all hover:border-[#FFB5C5]"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-[#8B5A3C]">{item.cake_name}</p>
                      <p className="text-sm text-gray-600">
                        {item.price.toLocaleString("vi-VN")}₫ x {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-[#FFB5C5]">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t-2 border-gray-100 pt-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{order.total_price.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                <div className="flex items-center justify-between border-t-2 border-gray-100 pt-3">
                  <span className="text-xl font-bold text-[#8B5A3C]">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-[#FFB5C5]">
                    {order.total_price.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
