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
    
    console.error("errotr in get analytics", error.message);
    throw error 
  }
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dalySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group:{
          _id:{$dateToString:{format:"%Y-%m-%d",$date:"$createdAt"}},
          sales:{$sum:1},
          revenue:{$sum:"$totalAmount"}
        }
      },
      {
        $sort:{_id:1}
      }
    ]);
    const dateArray=getDateInRange(startDate,endDate)
    return dateArray.map(date=>{
      const foundData=dalySalesData.find(item=>item._id===date)
      return {
        date,
        sales:foundData?.sales,
        revenue:foundData?.revenue
      }
    })
  } catch (error) {
    throw error
  }
};

const getDateInRange=(startDate,endDate)=>{
  const dates=[]
let currentDate=new Date(startDate)
  while(startDate<=endDate)
  {

dates.push(currentDate.toISOString().split("1")[0])
    currentDate.setDate(currentDate.getDate()+1)
  }

}