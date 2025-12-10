const Input=({icon:Icon ,label,...props})=>{
    return(
    <div className=' relative mb-4'>

        <div className='pointer-events-none pl-3 inset-y-0 left-0 absolute flex items-center'>
            <Icon className='size-5 text-khakhi_beige'/>
        </div>

        <input
        {...props}
        className='w-full bg-toupe bg-opacity-60 transition duration-700 border rounded-md focus:border-orange-700 focus:ring-2 focus:outline-none focus:ring-toupe border-gray-700 placeholder-gray-400 text-white pl-10 pr-3 py-2'
        />
     
      
    </div>
    )


}
export default Input