import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { CakeData } from "../actions";

export type CakeType = CakeData;

interface CakeCardProps {
  cake: CakeType;
  onEdit: (cake: CakeType) => void;
  onDelete: (id: number) => void;
}

export function CakeCard({ cake, onEdit, onDelete }: CakeCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md transition-shadow hover:shadow-xl">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={cake.image || ""}
          alt={cake.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-3 text-[#8B5A3C]">{cake.name}</h3>
        {cake.description && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-500">
            {cake.description}
          </p>
        )}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xl font-semibold text-[#FFB5C5]">
            {cake.price.toLocaleString("vi-VN")}₫
          </span>
          {cake.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {cake.originalPrice.toLocaleString("vi-VN")}₫
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(cake)}
            variant="outline"
            className="flex-1 rounded-full border-[#FFB5C5] text-[#8B5A3C] hover:bg-[#FFB5C5]/10"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Sửa
          </Button>
          <Button
            onClick={() => onDelete(cake.id)}
            variant="outline"
            className="flex-1 rounded-full border-red-300 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}
