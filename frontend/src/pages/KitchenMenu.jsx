import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMenuByKitchenId } from "../api/productApi";
import { fillOffset, m, motion } from "framer-motion"
import { Utensils } from "lucide-react";
import { useState } from "react"
import MenuCard from "../Components/MenuCard";

const KitchenMenu = () => {
  const { id } = useParams();
  const filters = ["All", "Lunch", "Dinner", "Snacks"]
  const [activeFilter, setActiveFilter] = useState("All")
  const { data, isPending } = useQuery(
    {
      queryKey: ["getMenuByKitchenId"],
      queryFn: () => getMenuByKitchenId(id)

    }
  )
  console.log("menu data in KitchenMenu", data.Menus)

  return (
    <div className="  bg-gradient-to-b from-taupeDark to-taupeDeep">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}

        className="flex  justify-center items-center gap-3 py-5">
        <span className="bg-pumpkin h-[1px] w-9" />
        <h1 className="text-pumpkin capitalize text-sm md:text-lg"> what we serve </h1>
        <span className="bg-pumpkin h-[1px] w-9" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mx-auto text-lg md:text-xl"
      >
        <Utensils className="size-5 text-pumpkin mx-auto mb-2" />
        <h1 className="text-off_white capitalize">our <span className="text-pumpkin">menu</span></h1>
      </motion.div>
      <div className="flex gap-8  lg:gap-10  bg-toupe/55 py-2 px-6 rounded-full mt-5  mx-auto w-fit border border-beige/25 ">
        {
          filters.map((filter) => (
            <motion.button key={filter}

              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full cursor-pointer transition-colors duration-300  ${activeFilter === filter
                ? "bg-gradient-to-b from-pumpkin to-pumpkinDark text-off_white "
                : "text-beige"
                } hover:bg-toupe/60 text-off_white`}
            >
              {filter}
            </motion.button>
          ))
        }

      </div>
      <div className=" max-w-5xl grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]  gap-4 mt-8  mx-auto px-4 border-red-500 border justify-items-center">
        {
          data.Menus.map((Menu) => (<MenuCard key={Menu.id} menu={Menu} />))
        }

      </div>

    </div>




  )
}

export default KitchenMenu
