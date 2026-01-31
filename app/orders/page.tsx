"use client";

import { DecorativeBackground } from "@/app/components/home/DecorativeBackground";
import { Footer } from "@/app/components/home/Footer";
import { Navigation } from "@/app/components/home/Navigation";
import { Badge } from "@/app/components/ui/badge";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Calendar, MapPin, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    fetchOrders();
  }, [user, router]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      <DecorativeBackground />
      <Navigation />

      <main className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-pacifico text-4xl text-[#8B5A3C] md:text-5xl">
              Đơn hàng của tôi
            </h1>
            <p className="mt-2 text-gray-600">
              Theo dõi trạng thái đơn hàng của bạn
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-3xl bg-white/50"
                />
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="group cursor-pointer rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB5C5] to-[#FF8FAB]">
                              <Package className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#8B5A3C]">
                              #{order.id.slice(0, 8).toUpperCase()}
                            </h3>
                          </div>
                          <Badge className={`${statusColors[order.status]} rounded-full border-2 px-3 py-1 font-semibold`}>
                            {statusLabels[order.status]}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#FFB5C5]" />
                            <span>
                              {order.created_at
                                ? new Date(order.created_at).toLocaleDateString(
                                    "vi-VN",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FFB5C5]" />
                            <span className="line-clamp-1">{order.customer_address}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Tổng tiền</p>
                          <p className="text-2xl font-bold text-[#FFB5C5]">
                            {order.total_price.toLocaleString("vi-VN")}₫
                          </p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-[#8B5A3C] transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB5C5] to-[#FF8FAB]">
                <Package className="h-12 w-12 text-white" />
              </div>
              <h2 className="mb-4 font-pacifico text-3xl text-[#8B5A3C]">
                Chưa có đơn hàng nào
              </h2>
              <p className="mb-6 text-gray-600">
                Bạn chưa đặt hàng. Hãy khám phá các sản phẩm của chúng tôi!
              </p>
              <Link href="/products">
                <button className="rounded-full bg-gradient-to-r from-[#FFB5C5] to-[#FF8FAB] px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  Mua sắm ngay
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
