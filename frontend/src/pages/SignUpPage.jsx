
import {motion} from 'framer-motion'
import Input from '../Components/Input'
import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'

const SignUpPage = () => {
  const[userDate,setUserData]=useState(
    {
      userName:"",
      password:"",
      email:""
    }
  )

  const handleSubmit=(e)=>{
e.preventDefault()

  }
  return (
<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className=" bg-toupe  text-white bg-opacity-35 max-w-md shadow-lg rounded-sm mx-auto mt-20 backdrop-blur-xl overflow-hidden"
>
  <div className='p-6'>

 <h1 className='text-2xl  font-bold mb-6 text-center  '>
  Create your account
 </h1>
 <form onSubmit={(e)=>handleSubmit(e)}>
  <Input
  icon={Mail}
  type="email"
  placeholder="enter your mail"
  />
    <Input
  icon={Lock}
  type="password"
  placeholder="******"
  />

 </form>

  </div>

</motion.div>
  )
}

export default SignUpPage
