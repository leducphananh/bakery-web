import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ReviewCardProps {
  name: string;
  avatar: string;
  rating: number;
  review: string;
}

export function ReviewCard({ name, avatar, rating, review }: ReviewCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
      <div className="mb-4 flex items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-[#FFB5C5]">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-[#FFF5E6]">{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[#8B5A3C]">{name}</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "fill-[#FFD700] text-[#FFD700]" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{review}"</p>
    </div>
  );
}
