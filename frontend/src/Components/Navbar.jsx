import { LogInIcon, ShoppingCart, User2Icon } from "lucide-react"
import { Link } from "react-router-dom"
import useAuthuser  from "../hooks/useAuth"
import { getInitials } from "../lib/getInitial";
import { authStores } from "../Store/authStores";


const Navbar = () => {

 
const {authUser}=useAuthuser()
  
  return (
    <header className=" fixed top-0 w-full border-b  left-0 border-khakhi_beige bg-toupe bg-opacity-60 shadow-lg transition-all duration-300 z-40 backdrop-blur-md  ">
      <div className="container mx-auto px-4 py-3 flex justify-between ">
        <Link to='/' className=" text-2xl font-bold text-orange-600 items-center space-x-2   ">Hamara Kichten</Link>
        <nav className="flex flex-wrap items-center gap-5 ">
          <Link to={"/"} className="text-gray-200 hover:text-pupkin_spice transition-all ease-in-out duration-300">Home</Link>
          <Link to={"/cart"} className="relative group "><ShoppingCart className=" inline-block mr-1 group-hover:text-pupkin_spice text-gray-200" size={20} />
            <span className="hidden sm:inline text-gray-200 group-hover:text-pupkin_spice transition-all ease-in-out duration-300">Cart</span>
            <span className="absolute -top-3 -left-3 bg-orange-700 text-white text-xs  rounded-full px-2 py-0.5 group-hover:bg-pupkin_spice transition-all ease-in-out duration-300">
              3
            </span>
          </Link>
          {authUser ? (
            <Link to={"/account"} className="relative group"><User2Icon className=" inline-block mr-1 group-hover:text-pupkin_spice text-gray-200" size={20} />
              <span className="hidden sm:inline text-gray-200 hover:text-pupkin_spice transition-all ease-in-out duration-300">{getInitials(authUser?.userName|| " ")}</span>
            </Link>
          ) : (<>
            <Link to={"/login"} className="text-white  hover:bg-pupkin_spice transition-all ease-in-out duration-300 flex items-center bg-yellow-900 px-4 py-2 rounded-md">
              <LogInIcon className="mr-3" size={20} /> Login</Link>
          </>)}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
