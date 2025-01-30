"use client";
import Orders from "@/components/Orders";
import PersonalInfo from "@/components/PersonalInfo";
import { logout } from "@/utils/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Page() {
  const [isOpen, setOpen] = useState<string>("account");
  const router = useRouter();
  return (
    <div className="flex mt-20">
      <div className="dashboard-sidebar">
        <div className="flex">
          <svg
            className="w-[48px] h-[48px] text-gray-800 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ms-3 mt-3 font-bold">Profile</span>
        </div>
        <hr />
        <div className=" px-3 py-4  bg-gray-50 ">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                className="dashboard-button group"
                onClick={() => setOpen("account")}
              >
                <svg
                  className="dashboard-icon group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ms-3 mt-1 whitespace-nowrap">
                  Account
                </span>
              </button>
            </li>
            <li>
              <button
                className="dashboard-button"
                onClick={() => setOpen("orders")}
              >
                <svg
                  className="dashboard-icon"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ms-3 mt-1 whitespace-nowrap">
                  Orders
                </span>
              </button>
            </li>
            <li>
              <Link
                href="/"
                className="dashboard-link group"
              >
                <svg
                  className="dashboard-icon group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ms-3 mt-1 whitespace-nowrap">Home</span>
              </Link>
            </li>
          </ul>
          <ul className="nav-list pt-4 mt-4 ">
            <li>
              <button
                onClick={() => {
                  logout();router.push("/");
                }}
                className="logout-icon"
              >
                <svg
                  className="logout-icon group-hover:text-gray-900 mt-1 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className=" ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="dashboard-content ">
        <div className={`${isOpen === "account" ? "" : "hidden"}`}>
          <PersonalInfo isStep={false}/>
        </div>
        <div className={`${isOpen === "orders" ? "" : "hidden"}`}>
          <Orders />
        </div>
      </div>
    </div>
  );
}
