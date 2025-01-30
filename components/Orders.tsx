'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchOrdrDetail } from "@/app/redux/slices/orderSlice";
import { AppDispatch,RootState } from "@/app/redux/store/strore";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Link from 'next/link';
import Loading from './Loading';
import {isTokenExpired} from '@/utils/actions/auth'
export default function OrderHistory() {
  const [id, setId] = useState<null>(null);
  const router = useRouter()
   useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const User = JSON.parse(userData);
        setId(User); // Set the user state
      }
    }, []);
    const dispatch:AppDispatch = useDispatch()
    const {status,orders} = useSelector((state: RootState) => state.order);
    useEffect(() => {
        if (status === "idle" && id) {
          isTokenExpired()
          dispatch(fetchOrdrDetail(id));
        }
      }, [dispatch, id, status]);
      if (status === "loading") {
        return <Loading/>
    }
    if (status === "failed") {
        return <div>Error loading orders.</div>;
    }
    return (
      <div className="h-full mt-10 bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Order History</h1>
        <div className="space-y-6">
          {
          orders.length>0 ?
          orders?.map((order, index) => (
            <div key={index} className="relative bg-white shadow-md rounded-lg p-6">
              {/* Order Details */}
              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Order ID: {order.uuid}
                  </h2> 
                  <p className="text-lg font-semibold text-gray-800">
                    Total: {order.totalPrice}
                  </p>
                </div>
                <p className="text-sm text-gray-500">Date: {order.createdAt}</p>
              </div>
              {/* Items List */}
              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Items:
                </h4>
                <ul className="space-y-2">
                  {order.order_items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex justify-between text-gray-600">
                      <Image
                          src={item.image}
                          alt={item.name}
                          width={64} 
                          height={64} 
                          className="h-16 object-contain m-0"
                        />
                      <span className='m-auto'>
                        {item.name} (x{item.quantity})
                      </span>
                      <span className='m-auto hidden lg:block'>{item.price * item.quantity}</span>
                      {
                        order.isPaid === true &&  <Link className='text-sm m-auto text-blue-700 hover:text-blue-500' href={`/orders_review/${item.product}`}>Rate & Review </Link>
                      }
                     <span className='m-auto lg:hidden'>{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
                     {/* Status at the Bottom */}
               {
                order.isPaid === true ?
                <div className="mt-4 py-2 px-4 text-center rounded-xl">
                <span
                  className={`text-lg font-semibold py-1 px-2 rounded-xl ${
                    order.isDelivered === true
                      ? "bg-green-100 text-green-600"
                      : order.isDelivered === false
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }`}
                >
                  {order.isDelivered === true ? "Delivered":"Processing"}
                </span>
              </div>:
              <div className="mt-4 py-2 px-4 text-center rounded-xl">
                <span className='text-lg font-semibold py-1 px-2 rounded-xl bg-green-100 text-red-600'>Canceled Order</span>
              </div>
               }      
               
            </div>
          )):  
          (<div className='text-center my-10'>
          <h2 className='font-bold '>No History</h2>           
          <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-6 py-2.5 text-center inline-flex items-center  me-2 mb-2"
          onClick={() =>router.back()}>
          <svg className="w-6 h-6 me-1 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
        </svg>
        Back
          </button>
        </div>
            )}
        </div>
      </div>
    </div>
    );
  }
  