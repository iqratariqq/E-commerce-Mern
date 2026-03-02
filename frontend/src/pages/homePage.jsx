
import { useQuery } from "@tanstack/react-query";
import biryani from "../assets/biryani.jpg";
import daal from "../assets/daal chawal.jpg";
import karahi from "../assets/karahi.webp";
import Categories from "../Components/Category";
import { getAllKitchens } from "../api/kitchenApi";
import Kitchen from "../Components/Kitchen";




const HomePage = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey:["getkitchens"],
    queryFn:getAllKitchens  

})
console.log("kitchens in home page", data)
  return (
    <div className=" relative max-w-6xl w-full  mx-auto mt-20 overflow-hidden h-auto min-h-screen   ">

      <h1 className="text-center font-bold  text-3xl  bg-gradient-to-r from-toupe  to-yellow-700 bg-clip-text text-transparent">Check our latest Catogries</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mx-2 gap-4">
        {data?.kitchens?.map((kitchen) => (
          <Kitchen key={kitchen._id} kitchen={kitchen} />
        ))}
      </div>

    </div>
  )
}

export default HomePage
