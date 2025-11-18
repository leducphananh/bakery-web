import { Button } from "@/app/components/ui/button";
import { Cake, Plus } from "lucide-react";

interface EmptyStateProps {
  onAddNew: () => void;
}

export function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <Cake className="mx-auto mb-4 h-16 w-16 text-gray-300" />
      <p className="text-lg text-gray-500">Chưa có bánh nào</p>
      <Button
        onClick={onAddNew}
        className="mt-4 rounded-full bg-[#FFB5C5] text-white hover:bg-[#FF9FB3]"
      >
        <Plus className="mr-2 h-5 w-5" />
        Thêm bánh đầu tiên
      </Button>
    </div>
  );
}
