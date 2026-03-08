import { ChefHat } from 'lucide-react';
import React, { useEffect, useState } from 'react'


const KitchenNavBar = ({ kitchenData }) => {

    const tabs = [
        { name: "Overview", id: "overview" },
        { name: "Menu", id: "menu" },
        { name: "Reviews", id: "reviews" },
        { name: "Contact", id: "contact" }
    ]
    const [activeTab, setActiveTab] = useState("overview");
       const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        < nav className={` fixed w-full
top-0
left-0 z-50 py-4 px-2 border-b-beige/25 backdrop-blur-sm flex justify-between items-center 
${isScrolled ? "border-b bg-taupeDeep/80 py-2" : "border-b-0"} 
`} >


            <div className="flex  lg:gap-4 gap-2 items-center ">
                <img src={kitchenData?.kitchen[0]?.kitchenImageURL} alt={kitchenData?.kitchen[0]?.kitchenName} className="size-12 rounded-full object-cover " />

                <h1 className="text-toupe font-bold lg:text-xl  md:text-lg">{kitchenData?.kitchen[0]?.kitchenName}</h1>
            </div>


            <div className='w-full  sm:max-w-2xl  lg:max-w-5xl  mx-auto flex justify-center  '>
                {tabs.map((tab) => (
                    <button
                        onClick={() => setActiveTab(tab.id)}
                        key={tab.id}
                        className={` flex items-center justify-center py-2 px-4 rounded-lg text-lg lg:text-xl lg:px-5  font-medium text-toupe hover:bg-toupe  hover:text-pupkin_spice  
               ${activeTab === tab.id ? "bg-pupkin_spice text-off_white " : " "} 
           
               `}
                    >
                        {tab.name}
                    </button>

                ))}
            </div>
            <div className="flex lg:gap-3 gap-2 items-center lg:px-3">
                <ChefHat className="size-5 text-toupe " />
                <h1 className="text-toupe text-opacity-90 font-bold   lg:text-xl  md:text-lg">{kitchenData?.kitchen[0]?.kitchenOwnerDetails?.userName}</h1></div>
        </nav>
    )
}

export default KitchenNavBar
