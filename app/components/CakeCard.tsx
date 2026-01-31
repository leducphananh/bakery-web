import { Button } from "@/app/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CakeCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  onAddToCart: () => void;
}

export default function CakeCard({
  id,
  name,
  description,
  price,
  image_url,
  is_available,
  onAddToCart,
}: CakeCardProps) {
  return (
    <div className="group transform overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link href={`/products/${id}`}>
        <div className="aspect-square overflow-hidden">
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
              <span className="text-8xl">🧁</span>
            </div>
          )}
          {!is_available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-red-500 px-6 py-2 text-lg font-semibold text-white">
                Hết hàng
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <Link href={`/products/${id}`}>
          <h3 className="mb-3 text-xl font-semibold text-[#8B5A3C] transition-colors hover:text-[#FFB5C5]">
            {name}
          </h3>
        </Link>
        {description && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-600">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold text-[#FFB5C5]">
              {price.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <Button
            size="sm"
            onClick={onAddToCart}
            disabled={!is_available}
            className="rounded-full bg-[#FFB5C5] text-white shadow-md hover:bg-[#FF9FB3] disabled:opacity-50"
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}
