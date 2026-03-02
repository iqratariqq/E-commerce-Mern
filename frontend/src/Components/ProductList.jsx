import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash, Star, Pencil } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProducts, toggleFeaturedProduct } from '../api/productApi'
import { deleteProduct } from '../api/productApi'
import Loader from './Loader'
import toast from 'react-hot-toast'
import { useProduct } from '../hooks/useProduct'
import ProductForm from './ProductForm'
const ProductList = () => {

  const { products, isLoading, } = useProduct();
  console.log("products in product list component", products)
  const queryClient = useQueryClient()
  const [selectedProduct, setSelectedProduct] = useState(null)

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

  const { mutate: toggleFeaturedProductMutation, isPending: isToggleFeaturedPending } = useMutation({
    mutationFn: toggleFeaturedProduct,
    onSuccess: () => {
      toast.success("Product featured status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
    onError: (err) => {
      toast.error("Failed to update product featured status", err.message)
    }
  })



  const handleFeaturedProduct = (productId) => {
    console.log("toggling featured status for product with id", productId)
    toggleFeaturedProductMutation(productId)
  }

  const handleDeleteProduct = (productId) => {
    console.log("deleting product with id", productId)
    deleteMutation(productId)

  }

  const handleEditProduct = (productData) => {
    console.log("editing product with id", productData)
    setSelectedProduct(productData)
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
        {!selectedProduct && <table className='min-h-full   divide-y divide-khakhi_beige mx-auto'>
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

            {products?.map((product) => (
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
                    onClick={() => handleFeaturedProduct(product._id)}
                    disabled={isToggleFeaturedPending}
                    className={isToggleFeaturedPending ? "opacity-50 cursor-not-allowed" : ""}

                  >
                    <Star style={{ size: 5 }} className={product.isFeatured ? "text-yellow-200 hover:text-yellow-500 " : "text-gray-400 hover:text-gray-100"} /></motion.button></td>
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
                    onClick={() => handleEditProduct(product)}
                    disabled={isPending}
                    className={isPending ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Pencil className='size-5 text-red-400 hover:text-red-300' /></motion.button></td>
              </tr>
            ))}

          </tbody>
        </table>}
        {selectedProduct &&
          <ProductForm
            mode='edit'
            productId={selectedProduct._id}
            previousData={selectedProduct}
          />}
      </div>
    </motion.div>
  )
}

export default ProductList
