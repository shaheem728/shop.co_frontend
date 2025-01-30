"use client";
import Image from "next/image";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "@/app/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store/strore";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "@/app/redux/slices/productSlice";
import { isTokenExpired } from "@/utils/actions/auth";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
export default function CartPage() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<string | null>(null); // Initialize user state
  const router = useRouter();
  useEffect(() => {
    if(typeof window !== "undefined"){
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }
  }, []);
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const {status } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    // Fetch products if not already loaded
    if (status === "idle") {
      dispatch(fetchProducts({ page: 1, search: "" }));
    }
  }, [dispatch, status]);
  const price = useMemo(() => {
    if (typeof window !== "undefined") {
      return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
    return 0; // Default value for SSR
  }, [cartItems])
  const discount = useMemo(() => (price * 20) / 100, [price]);
  const total = useMemo(() => price - discount + 15, [price, discount]);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading/>;
  }
  return (
    <section className="px-2 md:px-32 flex flex-col  ">
      <h1 className="font-extrabold text-4xl py-3">YOUR CART</h1>
      <div className="flex flex-col  lg:flex-row justify-between gap-3">
        <div className=" px-5 border rounded-2xl  flex flex-col  w-full">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex gap-5 my-5">
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
                        <button onClick={() => dispatch(removeItem(item.id))}>
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.25 3.5H13.5V2.75C13.5 2.15326 13.2629 1.58097 12.841 1.15901C12.419 0.737053 11.8467 0.5 11.25 0.5H6.75C6.15326 0.5 5.58097 0.737053 5.15901 1.15901C4.73705 1.58097 4.5 2.15326 4.5 2.75V3.5H0.75C0.551088 3.5 0.360322 3.57902 0.21967 3.71967C0.0790178 3.86032 0 4.05109 0 4.25C0 4.44891 0.0790178 4.63968 0.21967 4.78033C0.360322 4.92098 0.551088 5 0.75 5H1.5V18.5C1.5 18.8978 1.65804 19.2794 1.93934 19.5607C2.22064 19.842 2.60218 20 3 20H15C15.3978 20 15.7794 19.842 16.0607 19.5607C16.342 19.2794 16.5 18.8978 16.5 18.5V5H17.25C17.4489 5 17.6397 4.92098 17.7803 4.78033C17.921 4.63968 18 4.44891 18 4.25C18 4.05109 17.921 3.86032 17.7803 3.71967C17.6397 3.57902 17.4489 3.5 17.25 3.5ZM7.5 14.75C7.5 14.9489 7.42098 15.1397 7.28033 15.2803C7.13968 15.421 6.94891 15.5 6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75V8.75C6 8.55109 6.07902 8.36032 6.21967 8.21967C6.36032 8.07902 6.55109 8 6.75 8C6.94891 8 7.13968 8.07902 7.28033 8.21967C7.42098 8.36032 7.5 8.55109 7.5 8.75V14.75ZM12 14.75C12 14.9489 11.921 15.1397 11.7803 15.2803C11.6397 15.421 11.4489 15.5 11.25 15.5C11.0511 15.5 10.8603 15.421 10.7197 15.2803C10.579 15.1397 10.5 14.9489 10.5 14.75V8.75C10.5 8.55109 10.579 8.36032 10.7197 8.21967C10.8603 8.07902 11.0511 8 11.25 8C11.4489 8 11.6397 8.07902 11.7803 8.21967C11.921 8.36032 12 8.55109 12 8.75V14.75ZM12 3.5H6V2.75C6 2.55109 6.07902 2.36032 6.21967 2.21967C6.36032 2.07902 6.55109 2 6.75 2H11.25C11.4489 2 11.6397 2.07902 11.7803 2.21967C11.921 2.36032 12 2.55109 12 2.75V3.5Z"
                              fill="#FF3333"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-black text-sm font-normal">
                        Size:<span className="text-gray-500">{item.size}</span>{" "}
                      </span>
                      <span>
                        Color:
                        <span className="text-gray-500">{item.color}</span>{" "}
                      </span>
                      <div className="flex justify-between">
                        <span className="text-2xl font-bold">
                          ${item.price * item.quantity}
                        </span>
                        <div className="bg-secondary p-2 px-3 flex gap-3 rounded-full">
                          <button
                            onClick={() => {
                              dispatch(decreaseQuantity(item.id));
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                fill="black"
                              />
                            </svg>
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => {
                              dispatch(increaseQuantity(item.id));
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                fill="black"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-2" />
                </div>
              );
            })
          ) : (
            <div className="text-center my-10 h-96">
              <h2 className="font-bold ">Your cart is Empty</h2>
            </div>
          )}
        </div>
        <div className="flex flex-col p-2 border rounded-2xl w-full h-96">
          <span className="font-bold text-2xl py-4">order summary</span>
          {cartItems.length > 0 ? (
            <>
              <div className="flex justify-between my-2">
                <span className="font-normal text-gray-500 text-xl">
                  Subtotal
                </span>
                <span className="text-xl font-bold">${price}</span>
              </div>
              <div className="flex justify-between my-2">
                <span className="font-normal text-gray-500 text-xl">
                  Discount (-20%)
                </span>
                <span className="font-bold text-xl text-red-500">
                  -${discount}
                </span>
              </div>
              <div className="flex justify-between my-2">
                <span className="font-normal text-gray-500 text-xl">
                  Delivery Fee
                </span>
                <span className="text-xl font-bold">$15</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between my-2">
                <span className="font-normal text-gray-500 text-xl">Total</span>
                <span className="text-2xl font-bold">${total}</span>
              </div>
              <div className="flex justify-between gap-2 my-2">
                <div className="flex items-center bg-secondary rounded-full px-4 py-2 w-full">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.0766 10.4857L11.7653 1.17444C11.5917 0.999696 11.3851 0.861152 11.1576 0.766846C10.93 0.672541 10.686 0.62435 10.4397 0.625069H1.75001C1.45164 0.625069 1.16549 0.743595 0.954513 0.954574C0.743534 1.16555 0.625008 1.4517 0.625008 1.75007V10.4398C0.624289 10.6861 0.67248 10.9301 0.766785 11.1576C0.861091 11.3852 0.999635 11.5918 1.17438 11.7654L10.4856 21.0766C10.8372 21.4281 11.3141 21.6256 11.8113 21.6256C12.3084 21.6256 12.7853 21.4281 13.1369 21.0766L21.0766 13.1369C21.4281 12.7853 21.6255 12.3085 21.6255 11.8113C21.6255 11.3141 21.4281 10.8373 21.0766 10.4857ZM11.8113 19.2204L2.87501 10.2813V2.87507H10.2813L19.2175 11.8113L11.8113 19.2204ZM7.37501 5.87507C7.37501 6.17174 7.28703 6.46175 7.12221 6.70842C6.95739 6.9551 6.72312 7.14736 6.44903 7.26089C6.17494 7.37442 5.87334 7.40412 5.58237 7.34625C5.2914 7.28837 5.02413 7.14551 4.81435 6.93573C4.60457 6.72595 4.46171 6.45868 4.40383 6.1677C4.34595 5.87673 4.37566 5.57513 4.48919 5.30104C4.60272 5.02695 4.79498 4.79269 5.04165 4.62786C5.28833 4.46304 5.57834 4.37507 5.87501 4.37507C6.27283 4.37507 6.65436 4.5331 6.93567 4.81441C7.21697 5.09571 7.37501 5.47724 7.37501 5.87507Z"
                      fill="black"
                      fillOpacity="0.4"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="bg-transparent  border-0 focus:ring-0 text-gray-500 rounded-full"
                  />
                </div>
                <button className="bg-black px-4 py-3 text-white rounded-full font-medium w-1/3">
                  Apply
                </button>
              </div>
              <button
                  className="bg-black flex justify-center items-center gap-3 rounded-full text-white py-4 px-14 my-2"
                  onClick={async () => {
                    try {
                      await isTokenExpired(); // Ensure refreshToken is awaited if asynchronous
                      if (user) {
                        router.push("/checkout");
                      } else {
                        router.push("/user/login/?redirect=/cart");
                      }
                    } catch (error) {
                      console.log("Error refreshing token:", error); // Handle potential errors
                    }
                  }}
                >
                Go to Checkout
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7959 0.454104L18.5459 7.2041C18.6508 7.30862 18.734 7.43281 18.7908 7.56956C18.8476 7.7063 18.8768 7.85291 18.8768 8.00098C18.8768 8.14904 18.8476 8.29565 18.7908 8.4324C18.734 8.56915 18.6508 8.69334 18.5459 8.79785L11.7959 15.5479C11.5846 15.7592 11.2979 15.8779 10.9991 15.8779C10.7002 15.8779 10.4135 15.7592 10.2022 15.5479C9.99084 15.3365 9.87211 15.0499 9.87211 14.751C9.87211 14.4521 9.99084 14.1654 10.2022 13.9541L15.0313 9.12504L1.25 9.12504C0.951632 9.12504 0.665483 9.00651 0.454505 8.79554C0.243527 8.58456 0.125 8.29841 0.125 8.00004C0.125 7.70167 0.243527 7.41552 0.454505 7.20455C0.665483 6.99357 0.951632 6.87504 1.25 6.87504L15.0313 6.87504L10.2013 2.04598C9.98991 1.83463 9.87117 1.54799 9.87117 1.2491C9.87117 0.950218 9.98991 0.663574 10.2013 0.45223C10.4126 0.240885 10.6992 0.122151 10.9981 0.122151C11.297 0.122151 11.5837 0.240885 11.795 0.45223L11.7959 0.454104Z"
                    fill="white"
                  />
                </svg>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}
