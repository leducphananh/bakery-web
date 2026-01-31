import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ReviewCardProps {
  name?: string;
  avatar?: string;
  rating: number;
  review: string;
  author?: string;
  date?: string;
}

export function ReviewCard({
  name,
  avatar,
  rating,
  review,
  author,
  date,
}: ReviewCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
      <div className="mb-4 flex items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-[#FFB5C5]">
          <AvatarImage src={avatar} alt={author || name} />
          <AvatarFallback className="bg-[#FFF5E6]">
            {(author || name)?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-[#8B5A3C]">{author || name}</p>
          {date && <p className="text-sm text-gray-500">{date}</p>}
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
      <p className="text-gray-600 italic">&ldquo;{review}&rdquo;</p>
    </div>
  );
}
