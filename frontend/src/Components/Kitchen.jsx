import { Link } from "react-router-dom"
import { CheckCircle, ChevronDown, ChevronUp, XCircle } from "lucide-react";


const Kitchen = ({ kitchen }) => {
    return (
        <div className="relative mx-auto my-4  h-96 w-full rounded-2xl overflow-hidden group transition-transform hover:scale-95 duration-500 ease-out ">
            <Link to={"category/" + kitchen.category}>
                <div className="w-full h-full cursor-pointer">
                    <div className="bg-khakhi_beige bg-opacity-30  flex  justify-between lg:p-3 p-2">
                        <h1 className="font-bold text-lg lg:text-2xl text-toupe">
                            {kitchen.kitchenName}
                        </h1>
                        {
                            kitchen.status === "open?" ? <CheckCircle color="green" size={18} /> : <XCircle color="red" size={18} />
                        }
                    </div>

                    <img src={kitchen.kitchenImageURL} alt={kitchen.kitchenName} className="w-full h-full  inset-0 transition-transform group-hover:scale-110 duration-500" />
                    <div className="absolute bg-black bg-opacity-60 bottom-0 left-0 right-0">

                        <h2 className="p-2 lg:p-3  z-10 font-semibold text-2xl text-pupkin_spice ">{kitchen.category}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Kitchen
