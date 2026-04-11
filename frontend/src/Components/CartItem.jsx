import { Minus, Plus, Trash } from 'lucide-react'
import { motion } from "framer-motion"
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeAllItem } from '../api/cartApi'
import { toast } from 'react-hot-toast'

const CartItem = ({ item }) => {
  const queryClient = useQueryClient()
  const {mutate:removeItemMutation,isPending}=useMutation(
    {
      queryKey:["removeAllItem"],
      mutationFn:removeAllItem,
      onSuccess:()=>{
        toast.success("item removed successfully"),
        queryClient.invalidateQueries({ queryKey: ["getCartItems"] });

      },
      onError:(err)=>{
        toast.error(err.message || "failed to remove item") 
      }
    }
  )
  const handleRemoveAllItem=(productId)=>{
    console.log("handleRemoveAllItem called with productId:", productId," and item._id:", item)
    removeItemMutation(productId)
  }
  return (
    <div className='bg-taupeDark/75 p-4 md:p-6 rounded-lg mb-4 border border-beige/55 shadow-md'>
      <div className='space-y-2 md:flex md:items-center md:space-y-0 md:gap-6 '>
        <div className="shrink-0 ">
          <img src={item.productDetails.imageURL} alt={item?.productDetails.name} className="w-24 h-24 object-cover rounded-md" />
        </div>
        <div className=' space-y-2 md:flex-1 '>
          <div className='flex  justify-between'>
            <h2 className='text-pumpkinLight font-serif '>{item?.productDetails.name}</h2>
            <p className='text-sm text-beige'>{item?.productDetails.price} <span >\item</span> </p>
          </div>
          <div className='md:flex md:justify-between md:items-center  ' >
            <p className='text-sm hidden md:block '>{item?.productDetails.description}</p>
            <div className='flex items-center gap-2'>
              <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex size-5 items-center justify-center bg-beige/50 border border-beige rounded-sm hover:bg-beige/75 hover:outline-none "><Minus className='text-offWhite' /></motion.button>
              <p>{item?.cartItem.quantity}</p>
              <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex size-5 items-center justify-center bg-beige/50 border border-beige rounded-sm hover:bg-beige/75 hover:outline-none"><Plus className='text-offWhite'
              /></motion.button>
            </div>
            <p className="text-offWhite" >RS. <span>{item?.productDetails?.price?.toFixed(2) * item?.cartItem.quantity}
            </span></p>
          </div>
          <motion.button className='inline-flex items-center text-sm text-red-500 hover:text-red-700 focus:outline-none'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={()=>handleRemoveAllItem(item?.productDetails?._id)}
          >
          <Trash className='text-red-500 size-5' />
          </motion.button>
        </div>

      </div>

    </div>
  )
}

export default CartItem
