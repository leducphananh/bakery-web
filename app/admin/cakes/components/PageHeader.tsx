import { Button } from "@/app/components/ui/button";
import { LayoutDashboard, Plus } from "lucide-react";

interface PageHeaderProps {
  onAddNew: () => void;
}

export function PageHeader({ onAddNew }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-[#FFB5C5] p-3">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="font-pacifico text-3xl text-[#8B5A3C]">
            Quản lý bánh
          </h2>
          <p className="text-gray-600">
            Quản lý tất cả bánh ngọt hiển thị trên trang chủ
          </p>
        </div>
      </div>
      <Button
        onClick={onAddNew}
        className="rounded-full bg-[#FFB5C5] px-6 text-white shadow-lg hover:bg-[#FF9FB3]"
      >
        <Plus className="mr-2 h-5 w-5" />
        Thêm bánh mới
      </Button>
    </div>
  );
}
