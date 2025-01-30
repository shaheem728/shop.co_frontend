'use client';
import {API_URL} from '@/components/config'
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Page() {
  const [errorMsg, setErrorMsg] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  async function handleMobile() {
    try {
      const mobile_res = await fetch(`${API_URL}/api/mobile-validate/`, {
        method: 'POST',
        body: JSON.stringify({ mobile }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resData = await mobile_res.json();
      if (mobile_res.ok) {
        setErrorMsg('');
      localStorage.setItem('mobile', mobile);
        const otp_res = await fetch(`${API_URL}/api/otp-validate/`, {
          method: 'GET',
        });
        if (otp_res.ok) {
          const otpData = await otp_res.json();
          setOtp(otpData.otp);
        } else {
          setErrorMsg("Failed to fetch OTP. Please try again.");
        }
      } else {
        setErrorMsg(resData.error || "Something went wrong. Please try again.");
      }
    }catch{
      setErrorMsg("Network error. Please try again later.");
    }
  }
  useEffect(() => {
    if (otp) {
      const otphandling = async () => {
        try {
          const response = await fetch(`${API_URL}/api/otp-validate/`, {
            method: 'POST',
            body: JSON.stringify({ otp }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if(response.ok){
            setTimeout(() => {
             location.href='/changepassword'
            },(2000))
            return
          }else{
            setErrorMsg("Failed to validate OTP. Please try again.");
          }
        }catch{
          setErrorMsg("Network error while validating OTP.");
        }
      };
      otphandling();
    }
  }, [otp]);
  return (
    <section className="auth-section">
      <div className="auth-container">
        <h1 className="auth-heading ">Forgot Password</h1>
        {otp && (
          <div
            className="alert-message alert-success"
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
            <div>
              <span className="font-medium">{otp}</span>
            </div>
          </div>
        )}
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
            <div>
              <span className="font-medium">{errorMsg}</span> Change a few
              things up and try submitting again.
            </div>
          </div>
        )}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label
              htmlFor="mobile"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              placeholder="Mobile Number"
              className="form-input"
              required
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          {otp && (
            <div className="flex flex-col">
              <label
                htmlFor="otp"
                className="form-label "
              >
                OTP
              </label>
              <input
                type="number"
                id="otp"
                placeholder="Enter OTP"
                className="form-input"
                value={otp}
                readOnly
              />
            </div>
          )}
          {
            !otp &&  <button
            type="submit"
            className="btn-primary btn-submit"
            onClick={handleMobile}
          >
            Send
          </button>
          }
         
        </form>
        <p className="auth-link">
          Remember Password?{" "}
          <Link
            href="/login"
            className="link-hover"
          >
            Login
          </Link>
        </p>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <p className="auth-link">
          Create New Account?{" "}
          <Link
            href="/signup"
            className="link-hover"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
