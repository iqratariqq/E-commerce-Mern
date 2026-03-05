import { useParams } from "react-router-dom"
import { useKitchen } from "../hooks/useKitchen";
import { ChefHat, SquareChevronLeftIcon } from "lucide-react";
import { useState } from "react";



const KitchenDetailPage = () => {

  const { id } = useParams();
  const { kitchenData, isLoading, isError } = useKitchen(id);

  console.log("kitchenData in KitchenDetailPage", kitchenData)
  const tabs = [
    { name: "Overview", id: "overview" },
    { name: "Menu", id: "menu" },
    { name: "Reviews", id: "reviews" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" }
  ]
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>

      <div className="max-w-5xl w-full
    p-8 lg:p-12  mx-auto grid sm:grid-cols-2 gap-5 ">
        <div className="flex lg:gap-4 gap-2 items-center">
          <img src={kitchenData?.kitchen[0]?.kitchenImageURL} alt={kitchenData?.kitchen[0]?.kitchenName} className="size-12 rounded-full object-cover " />

          <h1 className="text-toupe font-bold text-3xl ">{kitchenData?.kitchen[0]?.kitchenName}</h1>
        </div>
        <div className="flex lg:gap-4 gap-2 items-center">
          <ChefHat className="size-5 text-toupe " />
          <h1 className="text-toupe text-opacity-90 font-bold text-2xl">{kitchenData?.kitchen[0]?.kitchenOwnerDetails?.userName}</h1></div>
      </div>
      <div className='w-full  sm:max-w-2xl  lg:max-w-5xl  mx-auto flex justify-center rounded-sm border border-toupe/40 '>
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.id)}
            key={tab.id}
            className={` flex items-center justify-center py-2 px-4 rounded-sm text-lg lg:text-2xl lg:px-5 w-44 font-medium text-toupe hover:bg-toupe  hover:text-pupkin_spice  
               ${activeTab === tab.id ? "bg-pupkin_spice text-off_white " : "bg-toupe/25 text-pupkin_spice "} `}
          >

            {tab.name}
          </button>

        ))}
      </div>

    </>
  )
}

export default KitchenDetailPage
