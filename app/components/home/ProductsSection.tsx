import { ProductCard } from "../ProductCard";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
}

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section id="products" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2
            className="mb-4 text-[#8B5A3C]"
            style={{
              fontFamily: "var(--font-pacifico), cursive",
              fontSize: "2.5rem",
            }}
          >
            Sản Phẩm Bán Chạy
          </h2>
          <p className="text-lg text-gray-600">
            Thưởng thức những món bánh được yêu thích nhất
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
