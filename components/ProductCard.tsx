import Image from "next/image";
import Star from "./Star";
import { Product } from "../app/redux/slices/productSlice";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

  return (
    <div className="flex flex-col  w-72 rounded-t-full">
      <Link href={`/products/${product.uuid}`}>
        {/* Image Section */}
        <div className="items-center justify-center bg-secondary p-1 w-full h-72">
            <Image
              src={product.colors[0].images[0].image}
              alt={product.name}
              width={194}
              height={312}
              quality={100}
              className="w-full h-full object-fill rounded-t-lg "
            />
        </div>

        {/* Product Name Section */}
        <div
          className="my-1 text-xl font-semibold text-black  break-words h-auto"
          
        >
          {product.name}
        </div>
      </Link>

      {/* Rating Section */}
      <div className="flex items-center gap-3 my-1">
        <Star star={Number(product.rating)} />
        <div>
          <span className="text-black text-base">{product.rating}/</span>
          <span className="text-gray-500 text-base">5</span>
        </div>
      </div>

      {/* Price Section */}
      {product.discount ? (
        <div className="flex gap-4">
          <span className="text-2xl font-bold text-black mt-1">
            ${Number(product.price) - Number(product.discount)}
          </span>
          <span className="text-2xl font-bold text-gray-400 line-through mt-1">
            ${product.price}
          </span>
          <div className="discount-content">
            -{product.discount}%
          </div>
        </div>
      ) : (
        <p className="text-2xl font-bold text-black mt-1">${product.price}</p>
      )}
    </div>
  );
}
