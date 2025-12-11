
import { motion } from 'framer-motion'
import Input from '../Components/Input'
import { useState } from 'react'
import { Loader, Lock, Mail, User } from 'lucide-react'
import { Link } from "react-router-dom"
import { useSignup } from '../hooks/useSignup'
import toast from 'react-hot-toast'

const SignUpPage = () => {


  const { isPending, error, signupMutation } = useSignup();

  const [signupData, setSignupData] = useState(
    {
      userName: "",
      password: "",
      confirmPassword: "",
      email: ""
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    
      if (signupData.confirmPassword !== signupData.password) {

        return toast.error("password must be same")
      }

      const { confirmPassword, ...newSignUPData } = signupData;

       signupMutation(newSignUPData)
     


  }
  return (
    <div className='lg:py-16 min-h-screen flex justify-center items-center  flex-col border  border-red-700 overflow-y-hidden lg:block'>
      <motion.div initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}>
        <h1 className='text-2xl  font-bold mb-6 text-center  '>
          Create your account
        </h1>

      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className=" bg-toupe  text-white bg-opacity-35 max-w-md w-full shadow-lg rounded-sm mx-auto  backdrop-blur-xl overflow-hidden"
      >
        <div className='p-6'>

          <form onSubmit={(e) => handleSubmit(e)} className='space-y-5'>

            <div className="form-controller">
              <label className="label">
                <span className="label-text">UserName</span>
              </label>
              <Input
                id="name"
                icon={User}
                label="userName"
                type="userName"
                placeholder="ali"
                value={signupData.userName}
                onChange={(e) => setSignupData({ ...signupData, userName: e.target.value })}
              />
            </div>

            <div className="form-controller">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <Input
                id="email"
                icon={Mail}
                label="email"
                type="email"
                placeholder="h12@gmail.com"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              />
            </div>

            <div className="form-controller">
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <Input
                id="password"
                icon={Lock}
                label="password"
                type="password"
                placeholder="******"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              />
            </div>

            <div className="form-controller">
              <label className="label">
                <span className="label-text">confirm password</span>
              </label>
              <Input
                id="confirmPassword"
                icon={Lock}
                label="confirmPassword"
                type="password"
                placeholder="******"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
              />
            </div>
                {error && (
                  
                  <p className="bg-red-700 text-white-500 mt-2 p-2 rounded-lg">
                    {" "}
                    {error.response?.data?.message || error.message}
                  </p>
                )}
               

            <motion.button className='w-full bg-toupe p-3 text-xl font-bold  outline-none rounded-md hover:bg-pupkin_spice focus:outline-none focus:ring-2 focus:ring-toupe focus:ring-opacity-35 tansition duration-700 '
              type='submit'
              whileHover={{ scale: 1.02 }}
              whileTap={{
                scale: 0.5

              }}
              disabled={isPending}
            >
              {isPending ? <div className='flex justify-center gap-3'>
                <Loader className="animate-spin" size={20} />
                <span className='text-sm font-medium '>Loading...</span>
              </div> : <>

                SignUp
              </>}
            </motion.button>
          </form>


        </div>
        <div className='py-5  flex justify-center items-center  bg-toupe bg-opacity-70 gap-2 rounded-md '>
          <p className=' text-sm '>have an account? </p>
          <Link to={"/login"} className='hover:underline text-pupkin_spice text-sm'>Login</Link>
        </div>

      </motion.div>
    </div>
  )
}

export default SignUpPage
