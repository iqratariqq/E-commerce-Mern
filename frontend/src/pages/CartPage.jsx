import { useQuery } from "@tanstack/react-query"
import { useCart } from "../hooks/useCart"
import { motion } from "framer-motion"
import CartItem from "../Components/CartItem"
import OrderSummary from "../Components/OrderSummary"


const CartPage = () => {
  const { cart } = useCart()
  // const{data:cart,isLoading,isError}=useQuery(
  //   {
  //     queryKey:["getcart"],
  //     queryFn:getCartItems,
  //   }
  // )
  console.log("cart items in CartPage", cart?.userProducts)
  console.log("quentity", cart)

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className=" w-full lg:max-w-2xl xl:max-w-4xl flex-none "
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
          {cart?.userProducts.length > 0 &&
            <motion.div initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
              className="mx-auto mt-6 max-w-4xl flex-1  lg:mt-0 lg:w-full"
            >
              <OrderSummary cart={cart} />
            </motion.div>



          }

        </div>

      </div>


    </div>
  )
}

export default CartPage

