import { useQuery } from "@tanstack/react-query"
import { getAnalyticsandDailySalesData } from "../api/analyticsApi"
import AnalyticCard from "./AnalyticCard"
import { useEffect, useState } from "react"
import { ChefHatIcon, LucideUtensils, Package, ShoppingBasket, User } from "lucide-react"

const AnalyticsTab = () => {
    const [analytics, setAnalytics] = useState({

        "Users": 0, "Menus": 0, "Kitchens": 0, "Sales": 0, "Revenue": 0

    })

    const { error, data, isLoading } = useQuery(
        {
            queryKey: ["getAnalytics"],
            queryFn: getAnalyticsandDailySalesData,
        }
    )
    useEffect(() => {
        setAnalytics(data?.analyticsData)

    }, [data])
    console.log("analytics data", data)

    return (
        <div>
            <AnalyticCard title={"Total Users"} value={analytics?.Users} icon={User} />
                        <AnalyticCard title={"Total Kitchens"} value={analytics?.Kitchens} icon={ChefHatIcon} />
            <AnalyticCard title={"Total Menus"} value={analytics?.Menus} icon={LucideUtensils} />

            <AnalyticCard title={"Total Sales"} value={analytics?.Sales}  icon={ShoppingBasket}/>
            <AnalyticCard title={"Total Revenue"} value={analytics?.Revenue} icon={Package} />
        </div>
    )
}

export default AnalyticsTab
