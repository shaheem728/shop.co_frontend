"use client";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/redux/store/strore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/components/config";
import { getAuthTokens, isTokenExpired } from "@/utils/actions/auth";
import { fetchuserDetail } from "@/app/redux/slices/userDetailSlice";
interface PageProps {
  handleStep?: () => void;
  isStep: boolean;
}
interface UserDetail {
  email: string;
  first_name: string;
  last_name: string;
  profile: {
    address: string;
    order_mobile: string;
  };
}
export default function PersonalInfo({ handleStep, isStep }: PageProps) {
  const [isenable, setEnable] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [id, setId] = useState<number>(0);
  const [token, setToken] = useState<string>();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    isTokenExpired();
    const userData = localStorage.getItem("user");
    if (userData) {
      const User = JSON.parse(userData);
      setId(User); // Set the user state
    }
  }, []);

  const { userInfo, status } = useSelector(
    (state: RootState) => state.userDetail
  );
  useEffect(() => {
    isTokenExpired();
    if (status === "idle" && id && !userInfo) {
      dispatch(fetchuserDetail(id));
    }
  }, [dispatch, id, status, userInfo]);
  async function getToken() {
    const token = await getAuthTokens();
    setToken(token.access_token);
  }
  async function handleForm(formData: FormData) {
    const userData: UserDetail = {
      email: formData.get("email")?.toString() || userInfo?.email || "",
      first_name:
        formData.get("first_name")?.toString() || userInfo?.first_name || "",
      last_name:
        formData.get("last_name")?.toString() || userInfo?.last_name || "",
      profile: {
        address:
          formData.get("address")?.toString() ||
          userInfo?.profile.address ||
          "",
        order_mobile:
          formData.get("phone")?.toString() ||
          userInfo?.profile.order_mobile ||
          userInfo?.profile.mobile ||
          "",
      },
    };
    try {
      getToken();
      const response = await fetch(`${API_URL}/api/user/update/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        if (handleStep) {
          handleStep();
          dispatch(fetchuserDetail(id));
          return;
        }
        if (isStep == false) {
          setSuccessMsg(true);
          setEnable(false);
          dispatch(fetchuserDetail(id));
          return;
        }
      } else {
        const errorData = await response.json();
        if (errorData) {
          // Extract 'detail' or other relevant error message
          setErrorMsg(
            errorData.detail || "An unknown error occurred.Please try again"
          );
        }
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    }
  }
  return (
    <div className="flex ">
      <section className="m-auto items-center mt-2 justify-center bg-gray-50">
        <div className=" md:w-[75vw] w-full border rounded-2xl px-6 py-8 bg-white shadow-lg">
          <h1 className="font-extrabold text-4xl text-center mb-6">
            Personal Info
          </h1>
          {successMsg && (
            <div
              id="alert-3"
              className={`flex  ${successMsg?'block':'hidden'} p-4  text-green-800 rounded-lg bg-green-50 `}
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
                Success fully Changed!
              </div>
              <button
                type="button"
                className="alert-success alert-message justify-self-end"
                data-dismiss-target="#alert-3"
                onClick={()=>{setSuccessMsg(false)}}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          )}
          {errorMsg && (
            <div
              id="alert-2"
              className={`flex p-4 mb-4 ${errorMsg?'block':'hidden'} text-red-800 rounded-lg bg-red-200 `}
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
                {typeof errorMsg === "string"
                  ? ` ${errorMsg}.Please try again`
                  : "An error occurred.Please try again"}
              </div>
              <button
                type="button"
                className="alert-error alert-message "
                data-dismiss-target="#alert-2"
                onClick={()=>{setErrorMsg('')}}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="grid">
            {isStep === false && (
              <button
                className="justify-self-end"
                onClick={() => {
                  setEnable(true);
                  isTokenExpired();
                  getAuthTokens();
                }}
              >
                <svg
                  className="w-[30px] h-[30px] text-blue-700 hover:text-blue-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <form action={handleForm}>
              <div className="grid gap-6 mb-6 md:grid-cols-2 ">
                <div>
                  <label
                    htmlFor="first_name"
                    className="form-profile"
                  >
                    First name
                  </label>
                  <input
                    defaultValue={(userInfo && userInfo?.first_name) || ""}
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="form-info"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="form-profile"
                  >
                    Last name
                  </label>
                  <input
                    defaultValue={(userInfo && userInfo?.last_name) || ""}
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="form-info"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="form-profile"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-info"
                    placeholder={
                      (userInfo && userInfo?.profile.order_mobile) ||
                      (userInfo && userInfo?.profile.mobile) ||
                      ""
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="form-profile"
                  >
                    Email address
                  </label>
                  <input
                    defaultValue={(userInfo && userInfo?.email) || ""}
                    type="email"
                    id="email"
                    name="email"
                    className="form-info"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 my-1">
                <label
                  htmlFor="address"
                  className="form-profile"
                >
                  Address
                </label>
                <textarea
                  defaultValue={(userInfo && userInfo?.profile.address) || ""}
                  id="address"
                  name="address"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Enter your address..."
                ></textarea>
              </div>
              <div className="flex  justify-self-center my-5 ">
                <button
                  type="submit"
                  className="btn-profile from-cyan-400 via-cyan-500 to-cyan-600  focus:ring-cyan-300 "
                  hidden={!isenable}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn-profile from-red-400 via-red-500 to-red-600  focus:ring-red-300  "
                  hidden={!isenable}
                  onClick={() => {
                    setEnable(false);
                    getToken();
                  }}
                >
                  Cancel
                </button>
              </div>
              {isStep === true && (
                <div className="flex justify-between">
                  <button
                    className="btn-next"
                    onClick={() => router.back()}
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
                    Cancel
                  </button>
                  <button
                    className="btn-next"
                    type="submit"
                  >
                    Continue
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
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
