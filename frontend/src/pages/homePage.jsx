
import biryani from "../assets/biryani.jpg";
import daal from "../assets/daal chawal.jpg";
import karahi from "../assets/karahi.webp";
import Categories from "../Components/Category";
const categories=[
  {href:"/Desi",name:"Desi",imageURL:biryani},
  {href:"/Italian",name:"Italian",imageURL:daal},
  {href:"/Chinese",name:"Chinese",imageURL:karahi},
  {href:"/Mexican",name:"Mexican",imageURL:biryani},
  {href:"/Thai",name:"Thai",imageURL:karahi},
]

const HomePage = () => {
  return (
    <div className=" relative max-w-6xl w-full  mx-auto mt-20 overflow-hidden h-auto min-h-screen   ">
      
      <h1 className="text-center font-bold  text-3xl  bg-gradient-to-r from-toupe  to-yellow-700 bg-clip-text text-transparent">Check our latest Catogries</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mx-2 gap-4">
        {categories.map((category)=>(
          <Categories category={category}/>
        ))}
      </div>
     
      

    </div>
  )
}

export default HomePage
