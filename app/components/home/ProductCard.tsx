import { ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
}

export function ProductCard({
  image,
  name,
  price,
  originalPrice,
}: ProductCardProps) {
  return (
    <div className="group transform overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="aspect-square overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-3 text-[#8B5A3C]">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold text-[#FFB5C5]">
              {price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="rounded-full bg-[#FFB5C5] text-white shadow-md hover:bg-[#FF9FB3]"
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}
