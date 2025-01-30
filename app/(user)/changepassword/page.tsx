'use client';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import {API_URL} from '@/components/config'
import {useRouter} from 'next/navigation'
export default function Page() {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState(null);
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mobileString = localStorage.getItem('mobile');
      setMobile(mobileString ? JSON.parse(mobileString) : null);
    }
  }, []);
  async function handleForm() {
    // Prevent default form submission behavior
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    const data = {
     "password":password,
     "mobile":mobile,
    };
    const response = await fetch(`${API_URL}/api/changepassword/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
      if (response.ok) {
        setErrorMsg('');
        setSuccessMsg(true);
        setTimeout(() => {
          router.push('/login')
        }, 2000);
        if (typeof window !== "undefined"){
        localStorage.removeItem('mobile');
        }
      } else {
        setErrorMsg(res.message || 'Unexpected error occurred');
      }
 
  }
  return (
    <section className="auth-section">
      <div className="auth-container">
        <h1 className="auth-heading ">Change Password</h1>
        {successMsg && (
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
            <span className="font-medium">Password changed successfully!</span>
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
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}
        <form className="space-y-6" action={handleForm}>
          <div className="flex flex-col">
            <label htmlFor="password" className="form-label ">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form-input"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="form-label ">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="form-input"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn-submit btn-primary"
          >
            Submit
          </button>
        </form>
        <div className="auth-link">
          Don’t have an account?{' '}
          <Link href="/signup" className="link-hover">
            Register
          </Link>
        </div>
      
      </div>
    </section>
  );
}
