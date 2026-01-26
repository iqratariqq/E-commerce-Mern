import { motion } from 'framer-motion'
import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import { useState } from 'react';
import CreateProductForm from '../Components/CreateProductForm';
import ProductList from '../Components/ProductList';
import Analytics from '../Components/Analytics';

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products List", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
]
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  return (
    <div className="min-h-screen flex flex-col items-center  lg:pt-7 pt-5 ">
      <div className="w-full  text-center  mb-10 pb-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-bold text-3xl lg:text-4xl text-toupe">Admin Dashboard</motion.h1>
      </div>

      <div className='w-full  sm:max-w-2xl  lg:max-w-5xl  bg-toupe bg-opacity-30 mx-auto flex justify-center rounded-sm gap-2 sm:gap-10 lg:gap-x-32 '>
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.id)}
            key={tab.id}
            className={` flex items-center py-2 px-4 rounded-sm text-lg lg:text-2xl lg:px-5  hover:bg-toupe hover:text-pupkin_spice  ${activeTab === tab.id ? "bg-pupkin_spice text-off_white " : "bg-toupe/25 text-pupkin_spice "} `}
          >
            <tab.icon className='mr-2 size-5 ' />
            {tab.label}
          </button>

        ))}
      </div>
      {activeTab === "create" && <CreateProductForm/>}
      {activeTab==="products" && <ProductList/>}
      {activeTab==="analytics" && <Analytics/>}


    </div>
  )
}

export default AdminPage
