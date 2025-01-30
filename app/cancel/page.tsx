"use client"
import { useEffect } from 'react'
import Swal from 'sweetalert2'
export default function Page(){
    const handleAlert =()=>{
        Swal.fire({
            title: 'Payment Failed!',
            text: 'Your payment could not be processed. Please try again.',
            icon: 'error',
            confirmButtonText: 'Ok',
            didClose: () => {
                window.location.href = '/';
              }
          })
    }
    useEffect(()=>{
        handleAlert()
        localStorage.removeItem("orderId");
    },[])
    return (
        <div className='h-screen'>
           
        </div>
    );
}
