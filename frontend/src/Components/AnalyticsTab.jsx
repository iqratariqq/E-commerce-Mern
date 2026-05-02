import { useQuery } from "@tanstack/react-query"
import { getAnalyticsandDailySalesData } from "../api/analyticsApi"
import AnalyticCard from "./AnalyticCard"
import { useEffect, useState } from "react"
import { Car, ChefHatIcon, LucideUtensils, Package, ShoppingBasket, User, User2Icon } from "lucide-react"
import { motion } from "framer-motion"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const AnalyticsTab = () => {
    const [analytics, setAnalytics] = useState({

        "Users": 0, "Menus": 0, "Kitchens": 0, "sales": 0, "Revenue": 0

    })
    const [dailySalesData, setDailySalesData] = useState([])

    const { error, data, isLoading } = useQuery(
        {
            queryKey: ["getAnalytics"],
            queryFn: getAnalyticsandDailySalesData,
        }
    )
    useEffect(() => {
        setAnalytics(data?.analyticsData)
        setDailySalesData(data?.salesData)

    }, [data])
    console.log("analytics data", data)
    console.log("analytics", analytics)

    return (
        <div className=" max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8  mt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <AnalyticCard title={"Total Users"} value={analytics?.Users || 0} icon={User2Icon}  />
                <AnalyticCard title={"Total Kitchens"} value={analytics?.Kitchens || 0} icon={ChefHatIcon}  />
                <AnalyticCard title={"Total Menus"} value={analytics?.Menus ||0} icon={LucideUtensils} />

                <AnalyticCard title={"Total Sales"} value={analytics?.sales ||0} icon={ShoppingBasket} />
                <AnalyticCard title={"Total Revenue"} value={analytics?.Revenue||0} icon={Package} />
            </div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}

            >
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={dailySalesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey='date' stroke="#D1D5DB" />
                        <YAxis yAxisId="left" stroke="#D1D5DB" />
                        <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
                        <Tooltip/>
                        <Legend/>
                        <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#3B82F6" activeDot={{ r: 8 }} name="Sales"/>
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" activeDot={{ r: 8 }} name="Revenue"/>


                    </LineChart>


                </ResponsiveContainer>

            </motion.div>


        </div>
    )
}

export default AnalyticsTab
