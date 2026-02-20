import React from 'react'
import { motion } from 'framer-motion'
import { Trash, Star } from "lucide-react"
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/productApi'
const ProductList = () => {

  const {data,isLoading}=useQuery({
    queryKey:["products"],
    queryFn:getProducts,
    
  })
  const products=data?.Menus||[]
  const users = [
    {
      id: 1,
      name: "Ali Khan",
      email: "ali@gmail.com",
      phone: "0300-1234567",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      email: "sara@gmail.com",
      phone: "0312-9876543",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Usman Raza",
      email: "usman@gmail.com",
      phone: "0333-4567890",
      role: "Editor",
      status: "Active",
    },
    {
      id: 4,
      name: "Ayesha Noor",
      email: "ayesha@gmail.com",
      phone: "0345-1122334",
      role: "User",
      status: "Active",
    },
    {
      id: 5,
      name: "Hassan Ali",
      email: "hassan@gmail.com",
      phone: "0321-7788990",
      role: "Manager",
      status: "Inactive",
    },
  ];

  return (
    <motion.div
      className='w-full  sm:max-w-2xl  lg:max-w-5xl bg-toupe/80 mt-3'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className=''>

        <table className='min-h-full   divide-y divide-khakhi_beige'>
          <thead>
            <tr >
              <th
                scope='col'
                className='px-6 lg:px-14 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                product
              </th>
              <th
                scope='col'
                className=' px-6 lg:px-14 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                price
              </th>
              <th
                scope='col'
                className=' px-6 lg:px-14 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                category
              </th>
              <th
                scope='col'
                className=' px-6 lg:px-14 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Avaiable
              </th>
              <th scope='col'
                className=' px-6 lg:px-14 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Featured</th>
              <th scope='col'
                className=' px-6 lg:px-14 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Delete</th>
            </tr>
          </thead>
          <tbody className='bg-toupe/50 divide-y divide-khakhi_beige '>

            {products.map((product) => (
              <tr className='hover:bg-toupe/60'>
                <td
                scope='col'
                 className='px-6 lg:px-14 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'>{product.name}</td>
                <td
                 scope='col'
                className='px-6 lg:px-14 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'><div>{product.price}</div></td>
                <td
                 scope='col'
                 className='px-6 lg:px-14 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'><div>{product.category}</div></td>
                <td className='px-6 lg:px-14 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'>{product.available ? "Yes" : "No"}</td>
                <td 
                 scope='col'
                className='px-6 lg:px-14 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'><motion.button
                  whileTap={{scale:0.7}}
                  >
                    <Star className='size-5' /></motion.button></td>
                <td 
                 scope='col'
                className='pl-6 lg:px-14 py-3 text-left text-sm font-medium text-gray-100 whitespace-nowrap'>
                  <motion.button
                  whileTap={{scale:0.7}}
                  >
                    <Trash className='size-5 text-red-400 hover:text-red-300'  /></motion.button></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ProductList
