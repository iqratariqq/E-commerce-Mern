import React from 'react'
import { motion } from 'framer-motion'
import { Trash, Star, Pencil } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProducts } from '../api/productApi'
import { deleteProduct } from '../api/productApi'
import Loader from './Loader'
import toast from 'react-hot-toast'
import { useProduct } from '../hooks/useProduct'
const ProductList = () => {

  const { products, isLoading, } = useProduct();
  const queryClient = useQueryClient()
  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product deleted successfully")
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
    onError: (err) => {
      toast.error("Failed to delete product", err.message)
    }
  })
  console.log("data", products)

  const handleDeleteProduct = (productId) => {
    console.log("deleting product with id", productId)
    deleteMutation(productId)

  }




  return (
    <motion.div
      className='w-full  sm:max-w-2xl  lg:max-w-5xl bg-toupe/80 mt-3 md:overflow-hidden overflow-auto'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {isLoading && <Loader />}
      <div className=''>

        <table className='min-h-full   divide-y divide-khakhi_beige mx-auto'>
          <thead>
            <tr >
              <th
                scope='col'
                className='px-6 lg:px-9  py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                product
              </th>
              <th
                scope='col'
                className=' px-6 lg:px-9 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                price
              </th>
              <th
                scope='col'
                className=' px-6 lg:px-9 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                category
              </th>
              <th
                scope='col'
                className=' px-6 lg:px-9 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Avaiable
              </th>
              <th scope='col'
                className=' px-6 lg:px-9 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Featured</th>
              <th scope='col'
                className=' px-6 lg:px-9 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Delete</th>
              <th scope='col'
                className=' px-6 lg:px-9 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Edit
              </th>
            </tr>
          </thead>
          <tbody className='bg-toupe/50 divide-y divide-khakhi_beige '>

            {products.map((product) => (
              <tr className='hover:bg-toupe/60' key={product._id}>
                <td
                  scope='col'
                  className='px-6 lg:px-9 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'>
                  <div className='flex justify-center items-center'>
                    {product.name}
                    <img src={product.imageURL} className="size-12 object-cover ml-2 rounded-full" />
                  </div>
                </td>
                <td
                  scope='col'
                  className='px-6 lg:px-9 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'><div>{product.price}</div></td>
                <td
                  scope='col'
                  className='px-6 lg:px-9 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'><div>{product.category}</div></td>
                <td className='px-6 lg:px-9 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'>{product.available ? "Yes" : "No"}</td>
                <td
                  scope='col'
                  className='px-6 lg:px-9    py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'><motion.button
                    whileTap={{ scale: 0.7 }}
                  >
                    <Star className='size-5' /></motion.button></td>
                <td
                  scope='col'
                  className='pl-6 lg:px-9 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'>
                  <motion.button
                    whileTap={{ scale: 0.7 }}
                    onClick={() => handleDeleteProduct(product._id)}
                    disabled={isPending}
                    className={isPending ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Trash className='size-5 text-red-400 hover:text-red-300' /></motion.button></td>
                                    <td
                  scope='col'
                  className='pl-6 lg:px-9 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'>
                  <motion.button
                    whileTap={{ scale: 0.7 }}
                    onClick={() => handleDeleteProduct(product._id)}
                    disabled={isPending}
                    className={isPending ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Pencil className='size-5 text-red-400 hover:text-red-300' /></motion.button></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ProductList
