import { Cake, Heart } from "lucide-react";

export function DecorativeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-10">
      <Cake className="absolute top-20 left-10 h-16 w-16 rotate-12 transform text-[#FFB5C5]" />
      <Heart className="absolute top-40 right-20 h-12 w-12 text-[#FFB5C5]" />
      <Cake className="absolute bottom-40 left-1/4 h-20 w-20 -rotate-12 transform text-[#D4A5A5]" />
      <Heart className="absolute right-1/3 bottom-20 h-14 w-14 rotate-45 transform text-[#FFB5C5]" />
    </div>
  );
}
