import Order from "../models/order.model.js";
import Menu from "../models/order.model.js";
import User from "../models/user.model.js";
import Kitchen from "../models/kitchen.model.js";
import mongoose from "mongoose";

export const getAnalytics = async () => {
  try {
    const totalUser = await User.countDocuments();
    const totalKitchen=await Kitchen.countDocuments();
    const totalMenus = await Menu.countDocuments();
    const salesData = await Order.aggregate([
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
      Menus: totalMenus,
      Kitchens: totalKitchen,
      sales: totalSales,
      Revenue: totalRevenue,
    };
  } catch (error) {
    console.error("errotr in get analytics", error.message);
    throw error;
  }
};

export const getDailySalesData = async (kitchenId, startDate, endDate) => {
  try {
  
    const dailySalesData = await Order.aggregate([
      {
$match: {
  products: {
    $elemMatch: {
      kitchen: new mongoose.Types.ObjectId(kitchenId),
    },
  },
  createdAt: {
    $gte: new Date(startDate),
    $lte: new Date(endDate),
  },
}
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
     console.log("daily sales data", dailySalesData);  

    const dateArray = getDateInRange(startDate, endDate);
    console.log("date array", dateArray); 

     const result= dateArray.map((date) => {
      const foundData = dailySalesData.find(
        (item) => item._id === date
      );
      console.log("found data for date",  foundData);

      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
    console.log("final daily sales data", result);
    return result;

  } catch (error) {
    throw error;
  }
};

const getDateInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  endDate = new Date(endDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate).toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const getKitchenSalesData = async (req,res) => {
  try {
    const { kitchenId } = req.params;
    const kitchenSalesData = await Order.aggregate([
      {
        $match: {
          "$products.kitchen": new mongoose.Types.ObjectId(kitchenId),
        },
      },
      {
        $group: {
          _id: "$products.product",
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$products.price" },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
    ]);
    return kitchenSalesData;
  } catch (error) {
    console.error("error in get kitchen sales data", error.message);
    throw error;
  }
};
