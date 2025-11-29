import Menu from "../models/menu.model.js";
import User from "../models/user.model.js";

export const getCartItems = async (req, res) => {
  try {
    const user = req.user;
    const userProducts = await User.aggregate([
      { $match: { _id: user._id } },
      { $unwind: "$cartItem" },
      { $lookup: {
          from: "menus",
          localField: "cartItem.product",
          foreignField: "_id",
          as: "productDetails"
        }},{$unwind: "$productDetails"

        }
        ,{$lookup:{
          from:"kitchens",
          localField:"productDetails.kitchen",
          foreignField:"_id",
          as: "kitchenDetails"
        }}
    ])
  
    if (userProducts.cartItem?.length === 0) {
      return res.status(404).json({ sucess: false, message: "no items found" });
    }
    return res.status(200).json({ sucess: true, userProducts });
  } catch (error) {
    console.log("error in get cart item", error.message);
    return res.status(500).json({
      sucess: false,
      message: "internal server error in getCartItems",
    });
  }
};

export const addtoCart = async (req, res) => {
  try {
    const { id: productId } = req.body;
    const user = req.user;

    const product=await Menu.findById(productId);
    if(!product || !product?.isAvailable){
      return res.status(404).json({success:false,message:"product not found or unavailable"})
    }

    const existingItem = await user.cartItem.find(                                                                                                                                                                                                                        
      (item) => item.product.toString() == productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      await user.cartItem.push({ product: productId });
    }
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "item added successfully" });
  } catch (error) {
    console.log("error in get cart item", error.message);
    return res
      .status(500)
      .json({ sucess: false, message: "internal server error in addtoCart" });
  }
};

export const removeAllItem = async (req, res) => {
  try {
    const { id: productId } = req.body;
    const user = req.user;
    const cartProduct = await user.cartItem.find(
      (item) => item.product.toString() == productId
    );

    if (cartProduct) {
      user.cartItem = await user.cartItem.filter(
        (item) => item.product.toString() !== productId
      );
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "item delete successfully" });
    }
    return res
      .status(404)
      .json({ success: false, message: "item not found in your cart" });
  } catch (error) {
    console.log("error in delete cart product", error.message);
    return res.status(500).json({
      sucess: false,
      message: "internal server error in removeAllItem",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const cartItem = await user.cartItem.find(
      (item) => item.product.toString() === productId
    );
    if (cartItem) {
      if (quantity === 0) {
        user.cartItem = await user.cartItem.filter(
          (item) => item.product.toString() !== productId
        );
      } else {
        cartItem.quantity = quantity;
      }
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "item update successfully" });
    }
    return res
      .status(404)
      .json({ success: false, message: "item not found in your cart" });
  } catch (error) {
    console.log("error in get cart item", error.message);
    return res.status(500).json({
      sucess: false,
      message: "internal server error in update cart",
    });
  }
};
