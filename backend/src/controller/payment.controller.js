import { stripe } from "../Utils/stripe";
import { findCoupon } from "./coupon.controller";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;
    if (products.length === 0 || !Array.isArray(products)) {
      return res
        .status(400)
        .json({ success: false, message: "product array is empty" });
    }
    let totalAmmount = 0;

    const liteItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // in stripe amount should be in cents,now considering the payment is in usd
      totalAmmount += amount * product.quantity;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            image: product.image,
          },
          unit_amount: amount,
          quantity: product.quantity,
        },
      };
    });

    const coupon = await findCoupon(couponCode, req.user._id);
    if (coupon) {
      totalAmmount -= Math.round(
        (totalAmmount * coupon.discountPercentage) / 100
      );
    }

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card",],
        line_items:liteItems,
        mode:"payment",
        success_url:`${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.CLIENT_URL}/purchase-cancel`,
        discounts:coupon?[
            {
                coupon:await createStripeCoupon(coupon.discountPercentage),
            }
        ]:[],
        metadata:{
            userId:req.user._id.toString(),
            couponCode:couponCode||" "
        }

    })
  } catch (error) {}
};

const createStripeCoupon=async(discountPercentage)=>{
    const coupon=await stripe.coupons.create({
        percent_off:discountPercentage,
        duration:"once"
    })
    return coupon.id
    

}