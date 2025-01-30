"use client";
import { API_URL } from "@/components/config";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "@/app/redux/store/strore";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdrDetail, Order } from "@/app/redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import { isTokenExpired,getAuthTokens } from "@/utils/actions/auth";
import Image from "next/image";
export default function Page({ params }: { params: Promise<{ Id: string }> }) {
  const { Id } = React.use(params);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderItem, setOrderItem] = useState<Order | any>(null);
  const [rate, setRate] = useState<number>(0);
  const [id, setId] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const router = useRouter();
  async function getToken() {
    const token = await getAuthTokens();
    setToken(token.access_token);
  }
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userToken = localStorage.getItem("token");
    if (userData && userToken) {
      const parsedUser = JSON.parse(userData);
      const parsedUserToken = JSON.parse(userToken);
      setId(parsedUser.user_id); // Set the user state
      setToken(parsedUserToken.access);
    }
  }, []);
  const dispatch: AppDispatch = useDispatch();
  const { status, orders } = useSelector((state: RootState) => state.order);
  useEffect(() => {
    if (status === "idle" && id) {
      dispatch(fetchOrdrDetail(id));
    }
  }, [dispatch, id, status]);
  const rating = new Array(5).fill(0);
  useEffect(() => {
    if (orders?.length > 0 && Id) {
      const parsedProductId = parseInt(Id, 10);
      if (!isNaN(parsedProductId)) {
        const item = orders.find((order) => {
          return order.order_items.some(
            (item) => item.product == parsedProductId
          );
        });
        console.log("item=",item)
        setOrderItem(item ? item : null);
      }
    }
  }, [orders, Id]);
  const handleAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "Thank you for the rating.",
      icon: "success",
      confirmButtonText: "Ok",
      didClose: () => {
        // Redirect to the previous page
        window.history.back();
      },
    });
  };
  async function handelForm(formData: FormData) {
    const review = {
      product: orderItem.order_items[0].product,
      user: id,
      rating: rate,
      comment: formData.get("comment"),
    };
    try {
      getToken() 
      const response = await fetch(`${API_URL}/api/createreview/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });
      if (response.ok) {
        handleAlert();
      } else {
        isTokenExpired();
        setErrorMsg("Something went wrong. Please try again.");
        getToken()
      }
    } catch{
      handleAlert();
      getToken()
      setErrorMsg("Something went wrong. Please try again.");
    }
  }
  return (
    <div className="flex h-full mt-16">
      <section className="m-auto items-center mt-2 justify-center bg-gray-50">
        <div className=" w-[75vw]  border rounded-2xl px-3 py-2 bg-white shadow-lg">
          <div className="flex justify-between w-auto  h-auto  px-6 py-8 bg-white shadow-md ">
            {errorMsg && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 "
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
                  <span className="font-medium">{errorMsg}</span> Change a few
                  things up and try submitting again.
                </div>
              </div>
            )}
            <div>
              <h1 className="font-extrabold text-2xl  mb-6">Rating & Review</h1>
              <h4 className="text-gray-600">{orderItem?.order_items[0].name}</h4>
            </div>
            <div>
              {
                orderItem?.order_items.map((item:any,index:number)=>{
                  return (
                    <Image
                    key={index}
                    className="h-20 w-auto object-contain rounded-md"
                    src={item.image}
                    alt="produt_image"
                    height={200}
                    width={200}
                  />
                  )
                })
              }
            </div>
          </div>
          <div className="grid">
            <form action={handelForm}>
              <div>
                <label
                  htmlFor="first_name"
                  className="text-xl font-semibold text-gray-600 mb-2"
                >
                  Rating
                </label>
                <div className="flex flex-row items-center mr-4 my-2">
                  {rating.map((item, index) => (
                    <span key={index} onClick={() => setRate(index + 1)}>
                      <svg
                        className={`w-6 h-6 ${
                          index < rate
                            ? "text-yellow-300"
                            : "text-slate-400 hover:text-yellow-300"
                        }  ms-1`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 my-1">
                <label
                  htmlFor="comment"
                  className="text-xl font-semibold text-gray-600 mb-2"
                >
                  Review
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Enter your Product Review..."
                ></textarea>
              </div>
              <div className="flex  justify-self-center my-5 ">
                <button
                  type="submit"
                  className="text-white w-48  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-white w-48  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
