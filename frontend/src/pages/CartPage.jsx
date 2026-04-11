import { useQuery } from "@tanstack/react-query"
import { useCart } from "../hooks/useCart"
import { motion } from "framer-motion"
import CartItem from "../Components/CartItem"


const CartPage = () => {
  const { cart } = useCart()
  // const{data:cart,isLoading,isError}=useQuery(
  //   {
  //     queryKey:["getcart"],
  //     queryFn:getCartItems,
  //   }
  // )
  console.log("cart items in CartPage", cart?.userProducts)
  console.log("quentity", cart?.userProducts.length)

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {cart?.userProducts.length === 0 ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
              </div>
            ) : (
              <div>
                {cart?.userProducts?.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
          </motion.div>

        </div>

      </div>


    </div>
  )
}

export default CartPage

