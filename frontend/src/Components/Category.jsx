import {Link} from "react-router-dom"

const Categories = ({ category }) => {
  return (
    <div className="relative mx-auto my-4  h-96 w-full rounded-2xl overflow-hidden group transition-transform hover:scale-95 duration-500 ease-out ">
      <Link to={"category"+category.href}>
      <div className="w-full h-full cursor-pointer">

      <img src={category.imageURL} alt={category.name} className="w-full h-full object-cover absolute inset-0 transition-transform group-hover:scale-110 duration-500" />
      <div className="absolute bg-black bg-opacity-60 bottom-0 left-0 right-0">

        <h2 className="p-2 lg:p-3  z-10 font-semibold text-2xl text-pupkin_spice ">{category.name}</h2>
      </div>
      </div>
      </Link>
    </div>
  )
}

export default Categories
