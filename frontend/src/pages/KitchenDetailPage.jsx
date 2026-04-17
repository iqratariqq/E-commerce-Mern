import { Link, Navigate, useParams } from "react-router-dom"
import { useKitchen } from "../hooks/useKitchen";
import KitchenMenu from "./KitchenMenu";
import KitchenNavBar from "../Components/KitchenNavBar";
import KitchenOverviewPage from "./KitchenOverviewPage";
import KitchenReviewsPage from "./KitchenReviewsPage";



const KitchenDetailPage = () => {

  const { id } = useParams();
  const { kitchenData, isLoading, isError } = useKitchen(id);

console.log("kitchenData in KitchenDetailPage", kitchenData)
  return (
    <>

<KitchenNavBar kitchenData={kitchenData}/>
<KitchenOverviewPage/>
<KitchenMenu kitchenId={id} />
<KitchenReviewsPage kitchenId={id} />
      

    </>
  )
}

export default KitchenDetailPage
