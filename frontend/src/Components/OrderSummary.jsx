import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'

const OrderSummary = ({cart}) => {

  const totalPrice=cart?.userProducts.reduce((sum,item)=>
             sum+item.productDetails
 .price*item.cartItem.quantity
        ,0)
        const formattedTotalPrice = totalPrice.toFixed(2)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-offWhite border border-gray-400 p-4 sm:p-6 rounded-lg shadow-sm space-y-4"
      >
      <p className="text-xl font-semibold  text-taupeDark">Order Summary</p>
      <div className='space-y-2 '>
        <dl className='flex items-center justify-between '>
          <dt className='text-base text-taupe/75 font-normal '>Total </dt>
          <dd className='text-base font-medium text-pumpkinDark/80'>${formattedTotalPrice}</dd>
        </dl>
          
      </div>


      <motion.button
        whileHover={{ scale: 1.05,duration: 0.3 }}
        whileTap={{ scale: 0.95 }}
        className="bg-pumpkinDark text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-pumpkinDark focus:ring-offset-2 w-full"
      >
        Proceed to Checkout
      </motion.button>
      <div className='flex items-center justify-center gap-2'>
        <span className='text-sm font-normal text-gray-700'>or</span>
        <Link to={"/"} className='text-pumpkinLight text-sm  font-medium underline hover:no-underline hover:text-pumpkinDark  inline-flex items-center justify-center gap-1'> Continue shopping
        <MoveRight size={16}/></Link>
      </div>

    </motion.div>
  )
}

export default OrderSummary
