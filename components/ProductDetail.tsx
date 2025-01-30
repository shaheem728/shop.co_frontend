import {API_URL} from '@/components/config'
import { SetStateAction, useEffect, useState } from "react";
import Reviews from "./Reviews";
import { Product } from '@/app/redux/slices/productSlice';
interface PageProps {
    detail:Product; 
  }
export default  function Page({ detail }:PageProps) {
    const [activeTab, setActiveTab] = useState("about");
    const [activeFQS, setActiveFQS] = useState("accordion-collapse-body-1");
    const [reviewsData, setReviewsData] = useState(null);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${API_URL}/api/review/${detail.uuid}`);
                const data = await response.json();
                setReviewsData(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [detail.uuid]);
  const handleTabClick = (tabId: SetStateAction<string>) => {
    setActiveTab(tabId);
  };
  const handleTabFQS = (tabId: SetStateAction<string>) => {
    setActiveFQS(tabId);
  };
  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow">
      <ul
        className="detail-list"
        id="defaultTab"
        role="tablist"
      >
        <li className="me-2">
          <button
            id="about-tab"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected={activeTab === "about"}
            className={`inline-block p-4 ${
              activeTab === "about"
                ? "text-blue-600 "
                : "hover:text-gray-600"
            } rounded-ss-lg hover:bg-gray-100 `}
            onClick={() => handleTabClick("about")}
          >
            Product Details
          </button>
        </li>
        <li className="me-2">
          <button
            id="services-tab"
            type="button"
            role="tab"
            aria-controls="services"
            aria-selected={activeTab === "services"}
            className={`inline-block p-4 ${
              activeTab === "services"
                ? "text-blue-600 "
                : "hover:text-gray-600"
            } hover:bg-gray-100 `}
            onClick={() => handleTabClick("services")}
          >
            Rating&Reviews
          </button>
        </li>
        <li className="me-2">
          <button
            id="statistics-tab"
            type="button"
            role="tab"
            aria-controls="statistics"
            aria-selected={activeTab === "statistics"}
            className={`inline-block p-4 ${
              activeTab === "statistics"
                ? "text-blue-600 dark:text-blue-500"
                : "hover:text-gray-600"
            } hover:bg-gray-100 `}
            onClick={() => handleTabClick("statistics")}
          >
            FAQS
          </button>
        </li>
      </ul>
      <div id="defaultTabContent">
        <div
          className={`p-4 bg-white rounded-lg md:p-8  ${
            activeTab === "about" ? "" : "hidden"
          }`}
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          {/* ========================= */}
          <div className="flex flex-col md:justify-between md:flex-row ">
            <ul className="list-disc ">
              <li className="text-gray-500 ">Dry clean</li>
              <li className="text-gray-500 ">Regular Fit</li>
            </ul>
            <ul>  
              <li className="text-gray-500">
                <span className="font-bold text-black">Generic Name:{detail.category}</span>
              </li>
              <li className="text-gray-500">
                <span className="font-bold text-black">Style:{detail.style}</span>
              </li>
              </ul>
              <ul>
              <li className="text-gray-500 ">
                <span className="font-bold text-black ">Manufacturer:</span>xyz
                Pvt Ltd
              </li>
              <li className="text-gray-500 ">
                <span className="font-bold text-black ">Product Code:</span>
                443011052007
              </li>
            </ul>
            <div className="">
              <h1 className="font-extrabold">About this item</h1>
              <p>{detail.description}</p>
            </div>
          </div>
        </div>
        <div
          className={`p-4 bg-white rounded-lg md:p-8  ${
            activeTab === "services" ? "" : "hidden"
          }`}
          id="services"
          role="tabpanel"
          aria-labelledby="services-tab"
        >
        {activeTab === "services" && reviewsData && <Reviews data={reviewsData} />}
          {/*review*/}
        </div>
        <div
          className={`p-4 bg-white rounded-lg md:p-8  ${
            activeTab === "statistics" ? "" : "hidden"
          }`}
          id="statistics"
          role="tabpanel"
          aria-labelledby="statistics-tab"
        >
          <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className="btn-dropdown"
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-1"
                onClick={() => handleTabFQS("accordion-collapse-body-1")}
              >
                <span>Will I receive a full refund?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              className={`${activeFQS == "accordion-collapse-body-1" ? '':'hidden'}`}
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div className="p-5 border border-b-0 border-gray-200 ">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                You will receive a full refund for the returned product if it meets the following conditions:
                </p>
                <ul className="list-disc ml-5  text-gray-500">
                  <li>Product is in its original condition (unused and undamaged).</li>
                  <li>All packaging and labels are intact.</li>
                  <li>The return is initiated within the return policy timeframe (7 days or more, if applicable).</li>
                </ul>
              </div>
            </div>
            <h2 id="accordion-collapse-heading-2">
              <button
                type="button"
                className="btn-dropdown"
                data-accordion-target="#accordion-collapse-body-2"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-2"
                onClick={() => handleTabFQS("accordion-collapse-body-2")}
              >
                <span>What payment methods do you accept?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-2"
              className={`${activeFQS == "accordion-collapse-body-2" ? '':'hidden'}`}
              aria-labelledby="accordion-collapse-heading-2"
            >
              <div className="p-5 border border-b-0 border-gray-200 ">
                <p className="mb-2 text-gray-500 ">
                Credit/Debit Cards: Visa, MasterCard, American Express
                </p>
                <p className="text-gray-500 ">
                Yes, we accept all major credit cards including Visa, MasterCard, and American Express. Simply select the &quot;Credit Card&quot; option during checkout and enter your card details securely.
              </p>

              </div>
            </div>
            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                className="btn-dropdown"
                data-accordion-target="#accordion-collapse-body-3"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-3"
                onClick={() => handleTabFQS("accordion-collapse-body-3")}
              >
                <span>
                How do I initiate a return after 7 days?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-3"
              className={`${activeFQS == "accordion-collapse-body-3" ? '':'hidden'}`}
              aria-labelledby="accordion-collapse-heading-3"
            >
              <div className="p-5 border border-t-0 border-gray-200 ">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                If you&apos;re seeking to return a product after the 7-day window, please get in touch with our customer support team. 
                They will assist you in determining eligibility and guide you through the process. For damaged or defective items, we may extend the return period.
                </p>
              </div>
            </div>
            <h2 id="accordion-collapse-heading-4">
              <button
                type="button"
                className="btn-dropdown"
                data-accordion-target="#accordion-collapse-body-4"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-4"
                onClick={() => handleTabFQS("accordion-collapse-body-4")}
              >
                <span>
                What if I receive a damaged or defective item?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-4"
              className={`${activeFQS == "accordion-collapse-body-4" ? '':'hidden'}`}
              aria-labelledby="accordion-collapse-heading-4"
            >
              <div className="p-5 border border-t-0 border-gray-200 ">
                <p className="mb-2 text-gray-500 ">
                If you receive a damaged or defective product, please contact our support team immediately. We will assist you with a return or exchange at no additional cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
}
