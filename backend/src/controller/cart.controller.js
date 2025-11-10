import User from "../models/user.model";

export const getCartItems=async(req,res)=>{
    try {
        const user=req.user;
        const userProducts=await User.find(user._id).select("addtoCart")
        if(userProducts.length===0)
        {
            return res.status(404).json({sucess:false,message:"no items found"})
        }
        return  res.status(200).json({sucess:false,userProducts})
        
    } catch (error) {
        console.log("error in get cart item",error.message)
     return res.status(500).json({sucess:false,message:"internal server error in getCartItems"})
        
    }

}

export const addtoCart=async(req,res)=>{
    try {
        const{id:productId}=req.body
        const user=req.user;
        

        
        
    } catch (error) {
        console.log("error in get cart item",error.message)
     return res.status(500).json({sucess:false,message:"internal server error in addtoCart"})
        
    }

}

