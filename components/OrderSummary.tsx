import { API_URL } from '@/components/config'
import { RootState } from "@/app/redux/store/strore";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {getAuthTokens ,isTokenExpired} from '@/utils/actions/auth'
import Image from "next/image";
interface PageProps {
  handleStep: () => void;
  handlePrevious: () => void;
}
export default function OrderSummary({ handleStep, handlePrevious }:PageProps) {
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(()=>{
    isTokenExpired()
  },[])
  const userInfo = useSelector((state: RootState) => state.userDetail.userInfo);
  const shippingAddress = useSelector(
    (state: RootState) => state.shipping.items
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const price = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = (price * 20) / 100;
  const total = price - discount + 15;
  const handleSubmit = async () => {   //order
    try {
      const payload = {
        paymentMethod: "card",
        order_items: cartItems.map((item) => ({
          product_id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          color: item.color,
          size: item.size,
          image: item.image,
        })),
        shipping_address: {
          country: shippingAddress.country,
          state: shippingAddress.state,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
        },
        totalPrice: total,
      };
      const {access_token} = await getAuthTokens()
      const response = await fetch(`${API_URL}/api/create-order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("respons=",data)
      if(response){
        localStorage.setItem("orderId",data.uuid)
        handlepayment();
      }
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData);
        isTokenExpired();
        return;
      }
    }catch{
      setErrorMsg("Network error during order creation")
    }
  };
  
  const handlepayment = async () => {
    const payload = {
      total,
    };
    try {
      const {access_token} = await getAuthTokens()
      const response = await fetch(`${API_URL}/api/create-checkout-session/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData);
        isTokenExpired();
        console.log("API Error:", errorData);
        return;
      }
  
      const data = await response.json();
      if (data.checkout_session) {
        window.location.href = `${data.checkout_session}`;
      } else {
        setErrorMsg("Failed to create checkout session");
        console.log("API Response missing checkout_session:", data);
      }
    
    } catch (error) {
      setErrorMsg("Network error during payment processing")
      console.log("Error during API call:", error);
    }
  };
  return (
    <section className="px-5 flex flex-col  lg:flex-row justify-between mt-2  bg-gray-50">
      <div className="w-full  border rounded-2xl px-6 py-8 mx-3 bg-white shadow-lg">
      {errorMsg && (
            <div
              className="alert-message alert-error"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{errorMsg}</span>
              </div>
            </div>
          )}
        <h1 className="font-extrabold text-4xl text-center mb-6">
          Order Summary
        </h1>
        <div className="space-y-6">
          <h3 className="font-bold text-2xl py-1">Shipping Address</h3>
          <div className="order-flex">
            <span className="order-h">Address</span>
            <span className=" font-bold text-1xl">
              {userInfo?.profile.address || ""}
            </span>
          </div>
          <div className="order-flex">
            <span className="order-h">Country</span>
            <span className="font-bold text-1xl">
              {shippingAddress.country || ""}
            </span>
          </div>
          <div className="order-flex">
            <span className="order-h">State</span>
            <span className=" font-bold text-1xl">
              {shippingAddress.state || ""}
            </span>
          </div>
          <div className="order-flex">
            <span className="order-h">City</span>
            <span className="font-bold text-1xl">
              {shippingAddress.city || ""}
            </span>
          </div>
          <div className="order-flex">
            <span className="order-h">
              Postal Code
            </span>
            <span className="font-bold text-1xl">
              {shippingAddress.postalCode || ""}
            </span>
          </div>
          <hr />
          <h3 className="font-bold text-2xl py-1">Payment Method</h3>
          <span className="order-h">Card</span>
          <hr />
          <h3 className="font-bold text-2xl py-1">Order Items</h3>
          {cartItems.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex gap-5 my-5 border-2 rounded-md">
                  <div className="bg-secondary rounded-lg  ">
                    <Image
                      src={item.image}
                      width={115}
                      height={187}
                      objectFit="cover"
                      alt="product"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between gap-4">
                      <span className="font-bold text-xl text-black">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-black text-sm font-normal">
                      Size:<span className="text-gray-500">{item.size}</span>{" "}
                    </p>
                    <p>
                      Color:<span className="text-gray-500">{item.color}</span>{" "}
                    </p>
                    <p>
                      Quantity:
                      <span className="text-gray-500">{item.quantity}</span>{" "}
                    </p>
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="my-2" />
              </div>
            );
          })}
        </div>
        <div className="justify-self-start">
          <button
            className="btn-next"
            onClick={() => handlePrevious()}
          >
            <svg
              className="w-7 h-7 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
            Previous
          </button>
        </div>
      </div>
      <div className="flex flex-col p-2 border rounded-2xl lg:w-2/4 w-full">
        <span className="font-bold text-2xl py-4">order summary</span>
        <div className="order-flex">
          <span className="font-normal text-gray-500 text-xl">Subtotal</span>
          <span className="text-xl font-bold">${price}</span>
        </div>
        <div className="order-flex">
          <span className="font-normal text-gray-500 text-xl">
            Discount (-20%)
          </span>
          <span className="font-bold text-xl text-red-500">-${discount}</span>
        </div>
        <div className="order-flex">
          <span className="font-normal text-gray-500 text-xl">
            Delivery Fee
          </span>
          <span className="text-xl font-bold">$15</span>
        </div>
        <hr className="my-2" />
        <div className="order-flex">
          <span className="font-normal text-gray-500 text-xl">Total</span>
          <span className="text-2xl font-bold">${total}</span>
        </div>
        <button
          className="bg-black flex justify-center items-center gap-3 rounded-full text-white py-4 px-14 my-2"
          type="submit"
          onClick={() => {
            handleSubmit();
            handleStep();
          }}
        >
          PAY NOW
          <svg
            className="w-[20px] h-[20px] text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
              d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
