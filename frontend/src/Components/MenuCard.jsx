import { motion } from "framer-motion"
import { Loader, ShoppingCartIcon, Star, StarIcon } from "lucide-react"
import { useAddtoCart } from "../hooks/useAddtoCart";



const MenuCard = ({ menu }) => {
    const { addtoCartMutation, isPending, isError } = useAddtoCart();
    

    const handleAddtoCart = (menuId) => {
    console.log("add to cart", menuId)
    console.log("addtoCartMutation in MenuCard")
    addtoCartMutation(menuId)

  }
  console.log("menu item in MenuCard", menu)
  return (
    <div className="bg-toupe/45 rounded-lg  w-full max-w-sm border   hover:bg-toupe/60 transition-all duration-300 cursor-pointer shadow-md border-beige/25 hover:shadow-lg hover:-translate-y-2  hover:border-pumpkin/50 relative "
    >

    
      <div className="relative overflow-hidden h-48 "><img src={menu.imageURL} alt={menu.name} className="w-full h-full object-cover rounded-lg " /></div>
      <div className="right-2 top-2 absolute">
        {menu.isFeatured && (
          <StarIcon className="size-5 text-yellow-200" />
        )}

      </div>
      {/* body */}
      <div className="pb-4  px-4 pt-2 flex flex-col gap-1">
        <h2 className="text-lg text-pumpkin  uppercase tracking-wide">{menu.category}</h2>

        <h3 className="text-xl font-bold text-offWhite font-serif">{menu.name}</h3>
        <p className=" text-beige font-thin space-y-2"> {menu.description}</p>
        <div className="flex justify-between">

          <p className="text-lg font-bold">${menu.price.toFixed(2)}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>handleAddtoCart(menu._id)}
            disabled={isPending}
            className="bg-gradient-to-r from-pumpkin to-pumpkinDark hover:bg-pumpkin/80 text-offWhite  py-2 px-4 rounded-lg flex items-center gap-2"
          >
            {isPending ? <div className='flex justify-center gap-3'>
                <Loader className="animate-spin" size={20} />
                <span className='text-sm font-medium '> Loading...</span>
              </div> : <>

                            <ShoppingCartIcon />
            <span>Add to Cart</span>
              </>}

          </motion.button>


        </div>


      </div>

    </div>

  )
}

export default MenuCard
