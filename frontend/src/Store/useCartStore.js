import {create} from "zustand"


export const useCartStore= create((set)=>({
    total:0,

    setTotal:(cart)=>{
        const totalPrice=cart?.userProducts.reduce((sum,item)=>
             sum+item.productDetails
 .price*item.cartItem.quantity
        ,0)
        set({ total: totalPrice })
    }
}))