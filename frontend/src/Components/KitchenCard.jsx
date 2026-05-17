import { Link } from "react-router-dom"
import { CheckCircle, XCircle, Clock, MapPin } from "lucide-react";

const KitchenCard = ({ kitchen }) => {
    const isOpen = kitchen.status === "open";

    return (
        <Link to={"kitchen-detail/" + kitchen._id}>
            <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:scale-105">
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={kitchen.kitchenImageURL}
                        alt={kitchen.kitchenName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
                </div>

                {/* Status Badge - Top Right */}
                <div className="absolute top-4 right-4 z-20">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md ${isOpen
                            ? "bg-green-500/90 text-white"
                            : "bg-red-500/90 text-white"
                        }`}>
                        {isOpen ? (
                            <>
                                <Clock size={16} />
                                <span className="text-xs font-semibold">Open</span>
                            </>
                        ) : (
                            <>
                                <XCircle size={16} />
                                <span className="text-xs font-semibold">Closed</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Content - Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    {/* Kitchen Name */}
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-pumpkin_spice transition-colors duration-300">
                        {kitchen.kitchenName}
                    </h2>

                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-pumpkin_spice text-white text-xs font-semibold rounded-full">
                            {kitchen.category}
                        </span>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button className="flex-1 bg-pumpkin_spice hover:bg-pumpkinDark text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 mr-2">
                            View Menu
                        </button>
                        <button className="p-2 bg-khakhi_beige hover:bg-opacity-80 text-taupe rounded-lg transition-all duration-300">
                            <MapPin size={18} />
                        </button>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-pumpkin_spice to-transparent" />
            </div>
        </Link>
    );
};

export default KitchenCard;
