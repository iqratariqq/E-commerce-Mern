import { useCart } from "../hooks/useCart"


const CartPage = () => {
const {cart,isLoading,isError}=useCart();
console.log("cart items in CartPage", cart?.userProducts)
console.log("quentity",data?.userProducts.length )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cart Page</h1>
      {cart?.userProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart?.userProducts?.map((item) => (
            <div key={item._id}>
              <h2>{item.productDetails.name}</h2>
              <p>Quantity: {item.cartItem.quantity}</p>
              <p>Price: ${item.productDetails.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CartPage

