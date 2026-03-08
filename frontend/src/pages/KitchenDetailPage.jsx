import { Link, Navigate, useParams } from "react-router-dom"
import { useKitchen } from "../hooks/useKitchen";
import { ChefHat, SquareChevronLeftIcon } from "lucide-react";
import { useState } from "react";
import KitchenMenu from "./KitchenMenu";
import KitchenNavBar from "../Components/KitchenNavBar";
import KitchenOverviewPage from "./KitchenOverviewPage";



const KitchenDetailPage = () => {

  const { id } = useParams();
  const { kitchenData, isLoading, isError } = useKitchen(id);

console.log("kitchenData in KitchenDetailPage", kitchenData)
  return (
    <>

<KitchenNavBar kitchenData={kitchenData}/>
<KitchenOverviewPage/>
<KitchenMenu kitchenId={id} />
      

    </>
  )
}

export default KitchenDetailPage
