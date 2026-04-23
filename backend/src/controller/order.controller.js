//---order controller to get user orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const kitchen = await Kitchen.findOne({ kitchenOwner: userId }).select(
      "menuItems",
    );
    const orders = await Order.aggregate([
      {
        $match: {
          "products.product": { $in: kitchen.menuItems },
          isDelivered: false,
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          __v: 0,
        },
      },
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
        0,
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

export const markOrderAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order not found" });
    }
    order.isDelivered = true;
    await order.save();
    return res.status(200).json({
      success: true,
      message: "order marked as delivered successfully",
    });
  } catch (error) {
    console.error("error in mark order as delivered controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};