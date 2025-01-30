"use client"
import dynamic from "next/dynamic";

const CartPage = dynamic(() => import('@/components/Cart'), { ssr: false });
export default function Page() {
  return (
    <div>
      <CartPage/>
    </div>
  )
}