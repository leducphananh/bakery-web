"use client";

import { DecorativeBackground } from "@/app/components/home/DecorativeBackground";
import { Footer } from "@/app/components/home/Footer";
import { Navigation } from "@/app/components/home/Navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [user, profile, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
        })
        .eq("id", user.id);

      if (error) throw error;

      await refreshProfile();
      toast.success("Cập nhật thông tin thành công!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Cập nhật thông tin thất bại");
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
        <div className="container mx-auto max-w-2xl px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-pacifico text-4xl text-[#8B5A3C] md:text-5xl">
              Thông tin cá nhân
            </h1>
            <p className="mt-2 text-gray-600">
              Quản lý thông tin tài khoản của bạn
            </p>
          </div>

          {/* Profile Card */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-[#8B5A3C]">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="rounded-full border-2 border-gray-200 bg-gray-50 px-4 py-6"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Email không thể thay đổi
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2 text-[#8B5A3C]">
                  <User className="h-4 w-4" />
                  Họ và tên
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={loading}
                  className="rounded-full border-2 border-gray-200 px-4 py-6 focus:border-[#FFB5C5] focus:ring-[#FFB5C5]"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-[#8B5A3C]">
                  <Phone className="h-4 w-4" />
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="rounded-full border-2 border-gray-200 px-4 py-6 focus:border-[#FFB5C5] focus:ring-[#FFB5C5]"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2 text-[#8B5A3C]">
                  <MapPin className="h-4 w-4" />
                  Địa chỉ
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={loading}
                  className="rounded-full border-2 border-gray-200 px-4 py-6 focus:border-[#FFB5C5] focus:ring-[#FFB5C5]"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full bg-gradient-to-r from-[#FFB5C5] to-[#FF8FAB] py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
