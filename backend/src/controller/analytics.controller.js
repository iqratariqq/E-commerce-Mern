import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalytics = async () => {
  try {
    const totalUser = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const salesData = await Order.aggregat([
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" }, //two question here,what is the need of grouping can we not do count doucument for total sale and is total revenue can only find through group?
        },
      },
    ]);

    const { totalSales, totalRevenue } = salesData[0] || {
      totalSales: 0,
      totalRevenue: 0,
    };
    return {
      Users: totalUser,
      Products: totalProducts,
      sales: totalSales,
      Revenue: totalRevenue,
    };
  } catch (error) {
    console.error("errotr in get analytics",error.message)
  }
};
