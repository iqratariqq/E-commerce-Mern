import Coupon from "../models/coupon.model.js";
import Kitchen from "../models/kitchen.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../Utils/stripe.js";
import { findCoupon } from "./coupon.controller.js";

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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: liteItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || " ",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });
    if (totalAmmount >= 20000) {
      await createNewCoupon(req.user._id);
    }
    res
      .status(200)
      .json({ sucess: true, id: session.id, totalAmmount: totalAmmount / 100 });
  } catch (error) {
    console.error("error in createchechout session controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createStripeCoupon = async (discountPercentage) => {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
};

export const createNewCoupon = async (userId) => {
  try {
    const newCoupon = new Coupon({
      code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      discountPercentage: 10,
      user: userId,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days
    });
    await newCoupon.save();
    return newCoupon;
  } catch (error) {
    throw error;
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      await Coupon.findOneAndUpdate(
        {
          code: session.metadata.couponCode,
          userId: session.metadata.userId,
        },
        {
          isActive: false,
        }
      );

      const products = JSON.parse(session.metadata.products);

      //save new order in db
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((p) => ({
          products: p.id,
          quantity: p.quantity,
          price: p.price,
        })),
        totalAmount: session.amount_total / 100,
        stripSessionId: sessionId,
      });

      await newOrder.save();
      res.status(200).json({
        success: true,
        message: "order placed successfully",
        orderId: newOrder._id,
      });
    } else {
      res
        .status(400)
        .json({ success: true, message: "payment not paid successfully" });
    }
  } catch (error) {
    console.error("error in ceckout success controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//---order controller to get user orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const kitchen = await Kitchen.findOne({ kitchenOwner: userId }).select(
      "menuItems"
    );
    const orders = await Order.aggregate([
      { $match: { "products.product": { $in: kitchen.menuItems }, isDelivered: false } },
      { $sort: { createdAt: -1 } },
      {$project:{
        __v:0
      }}
       
    ]);
    res.status(200).json({
      success: true,
      message: "user orders fetched successfully",
      orders: orders,
    });
  } catch (error) {
    console.error("error in get user orders controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const checkout = async (req, res) => {
  try {
    const { products } = req.body;

    const userId = req.user._id;

    const newOrder = new Order({
      user: userId,
      products: products.map((p) => ({
        product: p.id,
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount: products.reduce(
        (total, p) => total + p.price * p.quantity,
        0
      ),
    });
    await newOrder.save();
    res.status(200).json({
      success: true,
      message: "order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("error in place order controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



