import { ReviewCard } from "./ReviewCard";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  review: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section id="reviews" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2
            className="mb-4 text-[#8B5A3C]"
            style={{
              fontFamily: "var(--font-pacifico), cursive",
              fontSize: "2.5rem",
            }}
          >
            Đánh Giá Của Khách Hàng
          </h2>
          <p className="text-lg text-gray-600">
            Hãy nghe những gì khách hàng nói về chúng tôi!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              avatar={review.avatar}
              rating={review.rating}
              review={review.review}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
