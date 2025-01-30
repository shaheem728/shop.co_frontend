"use client";
import Link from "next/link";
import { signup } from "./action";
import {useActionState } from "react";
export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <section className="auth-section">
      <div className="auth-container">
        <h1 className="auth-heading ">SIGN UP</h1>
        {
          state?.errors && (
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{state?.errors}</span> 
            </div>
          </div>
            
          )
        }
        <form className="space-y-6" action={action}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="form-input"
              required
            />
          </div>
          {state?.errors?.name?.map((error: string, index: number) => (
            <p key={index} className="text-red-600">{error}</p>
          ))}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>
          {state?.errors?.email?.map((error: string, index: number) => (
          <p key={index} className="text-red-600">{error}</p>
            ))}
          <div className="flex flex-col">
            <label
              htmlFor="mobile"
              className="form-label "
            >
              mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Mobile Number"
              className="form-input"
              required
            />
          </div>
          {state?.errors?.mobile?.map((error: string, index: number) => (
            <p key={index} className="text-red-600">{error}</p>
          ))}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="form-label "
            >
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error: string) => (
                  <li key={error} className="text-red-600">- {error}</li>
                ))}
              </ul>
            </div>
          )}
      
          <button
            type="submit"
            disabled={pending}
            className="btn-primary btn-submit"
          >
            Sign Up
          </button>
        </form>
        <p className="auth-link">
          Already have an account?{" "}
          <Link
            href="/login"
            className="link-hover"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
