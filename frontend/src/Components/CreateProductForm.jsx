import { useState } from "react"
import { motion } from "framer-motion"
import Input from "./Input"
import { Upload } from "lucide-react"

const categories = [
  "Desi",
  "Fast Food",
  "Chinese",
  "Italian",
  "BBQ",
  "Beverages",
]

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageURL: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col w-full  max-w-2xl   bg-toupe bg-opacity-30 mx-auto  rounded-sm gap-2  mt-3 lg:mt-5"
    >
      <h1 className="pt-2 text-center  text-xl font-medium text-toupe">Add Product</h1>
      <div className="p-4">
        <form
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-controller ">
            <label className="label">
              <span className="label-text text-sm text-gray-300 ">Product Name</span>
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}

            />
          </div>
          <div >
            <label >
              <span className="text-sm text-gray-300 ">Description</span>
            </label>
            <textarea
              type="description"
              id="description"
              name="description"
              placeholder="Enter product description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className=" mt-1 w-full bg-toupe bg-opacity-60 transition duration-700 border rounded-md focus:border-orange-700 focus:ring-2 focus:outline-none focus:ring-toupe border-gray-700 placeholder-gray-400 text-white pl-10 pr-3 py-2"

            />
          </div>

          <div >
            <label >
              <span className="text-sm text-gray-300 ">Price</span>
            </label>
            <Input
              type="number"
              id="number"
              name="number"
              placeholder="100"
              step="100"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
          </div>
          <div >
            <label >
              <span className="text-sm text-gray-300 ">Category</span>
            </label>
            <select type="category"
              id="category"
              name="category"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className=" mt-1 w-full bg-toupe bg-opacity-60 transition duration-700 border rounded-md focus:border-orange-700 focus:ring-2     focus:outline-none focus:ring-toupe border-gray-700 placeholder-gray-400 text-white pl-10 pr-3 py-2">
              <option value='' >select product category</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}


            </select>
          </div>

          <div className="my-7">
            <input type="file" id="image" accept="image/*" className="sr-only"
              onChange={(e) => setProduct({ ...product, imageURL: URL.createObjectURL(e.target.files[0]) })}
            />

            <label htmlFor="image" className=" cursor-pointer bg-toupe bg-opacity-90 hover:bg-pupkin_spice transition duration-700 p-4 focus:ring-2 rounded-md focus:ring-pupkin_spice border-gray-700">
              <Upload className="size-5 inline-block mr-2" />

              Upload image</label>
            {product.imageURL && (
              <div className="mt-4">
                <img src={product.imageURL} alt="Product" className="size-20 object-cover rounded-md" />
              </div>
            )}
          </div>
          <div>
            <motion.button type="submit" className="w-full bg-pupkin_spice p-2 rounded-md text-xl hover:bg-toupe hover:text-pupkin_spice transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </div>

        </form>

      </div>


    </motion.div>
  )
}

export default CreateProductForm
