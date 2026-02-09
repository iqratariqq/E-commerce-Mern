import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Crown, Loader, Upload, User, UserCog, UserCogIcon } from 'lucide-react'
import Input from '../Components/Input'
import { useMutation } from '@tanstack/react-query'
import { registerKitchen } from '../api/kitchenApi'
import toast from 'react-hot-toast'

const RegisterKitchen = () => {
  const { mutate: registerKitchenMutation, isPending } = useMutation({
    mutationFn: registerKitchen,
    mutationKey: ["registerKitchen"],
    onSuccess: () => {
      toast.success("register Kitchen successfully")

    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message)
    }

  })

  const categories = [
    "Desi",
    "Fast Food",
    "Chinese",
    "Italian",
    "BBQ",
    "Beverages",
  ]
  const [kitchenData, setKitchenData] = useState({
    kitchenName: "",
    kitchenAddress: "",
    category: "",
    kitchenImage: null
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(kitchenData)
    const formData = new FormData();
    formData.append("kitchenName", kitchenData.kitchenName);
    formData.append("kitchenAddress", kitchenData.kitchenAddress);
    formData.append("category", kitchenData.category);
    formData.append("kitchenImage", kitchenData.kitchenImage);
    registerKitchenMutation(formData)
  }
  return (
    <div className='min-h-screen overflow-y-hidden'>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-center mt-5 gap-2 lg:pt-7'>
        <div className='flex  flex-col justify-center  text-toupe items-center '>
          <ChefHat size={25} />
          <User />
        </div>
        <h1

          className='text-3xl font-bold text-toupe text-center mt-1flex items-center justify-center gap-2'
        >

          Register Your Kitchen
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='bg-white bg-opacity-10 rounded-lg shadow-lg p-8 mt-6 w-full max-w-xl backdrop-blur-sm mx-auto '>


        <form onSubmit={(e) => handleSubmit(e)} className=''>
          <div>
            <label className='block text-gray-200 text-sm'>Kitchen Name</label>
            <Input
              type="text"
              id="kitchenName"
              placeholder="Enter kitchen name"
              required
              value={kitchenData.kitchenName}
              onChange={(e) => setKitchenData({ ...kitchenData, kitchenName: e.target.value })}
            />
          </div>
          <div>
            <label >
              <span className="text-sm text-gray-200 ">Kitchen Adress</span>
            </label>
            <textarea
              type="text"
              id="kitchenAddress"
              name="kitchenAddress"
              placeholder="Enter Kitchen Address"
              value={kitchenData.kitchenAddress}
              onChange={(e) => setKitchenData({ ...kitchenData, kitchenAddress: e.target.value })}
              className=" w-full bg-toupe bg-opacity-60 transition duration-700 border rounded-md focus:border-orange-700 focus:ring-2 focus:outline-none focus:ring-toupe border-gray-700 placeholder-gray-400 text-white pl-10 pr-3 py-2 mt-1 mb-3"

            />
          </div>
          <div>
            <label >
              <span className="text-sm text-gray-200 ">Category</span>
            </label>
            <select className='w-full bg-toupe bg-opacity-60 transition duration-700 border rounded-md focus:border-orange-700 focus:ring-2 focus:outline-none focus:ring-toupe border-gray-700 placeholder-gray-400 text-white pl-10 pr-3 py-2 mt-1 '
              onChange={(e) => setKitchenData({ ...kitchenData, category: e.target.value })}
              id={"category"}
            >
              <option value={''}>Select a category</option>
              {categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>

          </div>


          <div className='mt-9'>

            <input type='file' id='image' accept='image/*' className='sr-only' onChange={(e) => setKitchenData({ ...kitchenData, kitchenImage: e.target.files[0] })} />
            <label htmlFor='image' className='cursor-pointer bg-toupe bg-opacity-70 hover:bg-pupkin_spice transition duration-700 p-4 focus:ring-2 rounded-md focus:ring-pupkin_spice border-gray-700  '>
              <Upload className='size-5 inline-block mr-1' />
              Upload Kitchen Image</label>
            {kitchenData.kitchenImage && (
              <div className="mt-4">
                <img src={URL.createObjectURL(kitchenData.kitchenImage)} alt="Kitchen" className="size-20 object-cover rounded-md" />
              </div>
            )}
          </div>


          <div>
            <motion.button type="submit" className="w-full bg-pupkin_spice p-3 rounded-md text-xl  hover:bg-pupkin_spice/85 transition-all duration-75 mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPending ? <div className='flex justify-center gap-3'>
                <Loader className="animate-spin" size={20} />
                <span className='text-sm font-medium '>Loading...</span>
              </div> : <>

                Submit
              </>}

            </motion.button>
          </div>

        </form>

      </motion.div>

    </div>
  )
}

export default RegisterKitchen
