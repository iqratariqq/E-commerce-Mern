import {  MoveRight, XCircle } from "lucide-react"
import { Link } from "react-router-dom"


const PurchaseCancelPage = () => {
    return (
        <div className="min-h-screen  flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-offWhite/50 rounded-md shadow-xl overflow-hidden z-10">
                <div className="p-6 sm:p-8  ">
                    <div className="flex items-center justify-center">
                        <XCircle className="size-16 text-red-600 mb-4" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl  font-bold text-toupe mb-2 text-center">Purchase Cancelled!</h1>
                    <p className="text-gray-600 mb-2 text-center">Your purchase has been cancelled.</p>
                    <p className="text-taupeDeep text-center text-sm mb-6">If you have any questions, please contact our support team.</p>
                    <div className='space-y-4'>
                        <Link to={"/"} className='text-pumpkin text-sm  font-medium underline hover:no-underline hover:text-pumpkinDark  inline-flex items-center justify-center gap-1 w-full'> Continue shopping
                            <MoveRight size={16} /></Link>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default PurchaseCancelPage
