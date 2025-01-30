"use client"
import {API_URL} from '@/components/config'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
export default function Page(){
    const handleAlert =()=>{
        Swal.fire({
            title: 'Success!',
            text: 'Thank you for shopping with us',
            icon: 'success',
            confirmButtonText: 'Ok',
            didClose: () => {
                window.location.href = '/';
              }
          })
    }
   useEffect(() => {
    const uuid = localStorage.getItem("orderId")
    if (uuid) {
        fetch(`${API_URL}/api/order-Update/${uuid}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.ok) {
                    localStorage.removeItem("orderId");
                    localStorage.removeItem("cart");
                    handleAlert();
                } else {
                    res.json().then((error) => {
                        console.error('Server Error:', error);
                    });
                }
            })
            .catch((error) => {
                console.log('Network Error:', error);
            });
        
    }
   },[])
    return (
        <div className='h-screen'>
         
        </div>
    );
}
