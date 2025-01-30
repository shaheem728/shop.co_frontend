"use client"
import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/strore";
import { Product } from "@/app/redux/slices/productSlice";
import { useEffect, useState } from "react";

export default function Products(data: { data: string }) {
  const [items, setItems] = useState<Product[]>([])
  const { products} = useSelector((state: RootState) => state.products);
  useEffect(() => {
    const filteredItems = products.filter((product) => product.category === data.data);
    setItems(filteredItems);
  }, [products, data]);
  
  return (
    <>
    {
      items.length === 0 ? '':(
        <section id="new-arrival" className="bg-white py-16 px-14">
        <h1 className="text-5xl font-bold text-black text-center">YOU MIGHT ALSO LIKE</h1> 
        <div className="flex flex-wrap justify-center gap-6 py-14">
          {items.slice(1, 5).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
      )
    }   
    </>
  );
}