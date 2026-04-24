import { CheckCircle, HandHeart, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import Confetti from 'react-confetti'



const PurchaseSuccessPage = () => {
  const [isProccessing, setIsProcessing] = useState(true)

  const queryClient = useQueryClient();
  useEffect(() => {
    const handleCheckOutsuccess = async (sessionId) => {
    try {
      
        const res = await axiosInstance.post("/payment/checkout-success", { sessionId })
        setIsProcessing(false)
        queryClient.invalidateQueries({ queryKey: ["getCartItems"] });
      }

    catch (error) {
      console.log(error)

    } finally {
      setIsProcessing(false)
    }
  }

    const sessionId = new URLSearchParams(window.location.search).get("session_id")
    if (sessionId) {
      handleCheckOutsuccess(sessionId)
    }
    else {
      setIsProcessing(false)
      console.log("sessionId not found by searchURL")
    }

  }, [])

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={700}
        recycle={false}
        gravity={0.1}
      />
      <div className="max-w-md w-full bg-offWhite/70 rounded-md shadow-xl overflow-hidden z-10">

        <div className="p-6 sm:p-8  ">
          <div className="flex items-center justify-center">
            <CheckCircle className="size-16 text-green-600 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl  font-bold text-toupe mb-2 text-center">Purchase Successful!</h1>
          <p className="text-gray-600 mb-2 text-center">Thank you for your purchase.{"we're"} processing your order.</p>
          <p className="text-taupeDeep text-center text-sm mb-6">Check your email for order details and updates</p>
          <div className="bg-taupeDark/30 rounded-md p-4 mb-6 ">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-taupeDeep">Order Number </span>
              <span className=" font-semibold text-taupeDark">#123456</span>
            </div>
            <div className="flex items-center justify-between text-sm ">
              <span className="text-taupeDeep">Estimated Delivery: </span>
              <span className="font-semibold text-taupeDark">3-5 Business Days</span>
            </div>
            <div>
            </div>
          </div>

          <div className='space-y-4'>
            <button className='bg-pumpkin text-white py-2 px-4 rounded-md hover:bg-pumpkinDark transition-colors duration-200 flex items-center justify-center gap-2 w-full focus:outline-none focus:ring-2 focus:ring-pumpkin focus:ring-offset-1'>
              <HandHeart />
              Thanks for your support!
            </button>
            <Link to={"/"} className='text-pumpkin text-sm  font-medium underline hover:no-underline hover:text-pumpkinDark  inline-flex items-center justify-center gap-1 w-full'> Continue shopping
              <MoveRight size={16} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;