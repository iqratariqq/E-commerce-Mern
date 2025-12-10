
import { motion } from 'framer-motion'
import Input from '../Components/Input'
import { useState } from 'react'
import { Loader, Lock, Mail, User } from 'lucide-react'
import { Link } from "react-router-dom"

const SignUpPage = () => {
  const isLoading=false
  const [signupDate, setSignupData] = useState(
    {
      userName: "",
      password: "",
      confirmPassword: "",
      email: ""
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()

  }
  return (
    <div className='py-12'>
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
        className=" bg-toupe  text-white bg-opacity-35 max-w-md shadow-lg rounded-sm mx-auto  backdrop-blur-xl overflow-hidden"
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
                value={signupDate.userName}
                onChange={(e) => setSignupData({ ...signupDate, userName: e.target.value })}
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
                value={signupDate.email}
                onChange={(e) => setSignupData({ ...signupDate, email: e.target.value })}
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
                value={signupDate.password}
                onChange={(e) => setSignupData({ ...signupDate, password: e.target.value })}
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
                value={signupDate.confirmPassword}
                onChange={(e) => setSignupData({ ...signupDate, confirmPassword: e.target.value })}
              />
            </div>

            <motion.button className='w-full bg-toupe p-3 mt-4 text-xl font-bold  outline-none rounded-md hover:bg-pupkin_spice focus:outline-none focus:ring-2 focus:ring-toupe focus:ring-opacity-35 tansition duration-700 '
              type='submit'
              whileHover={{ scale: 1.02 }}
              whileTap={{
                scale: 0.5

              }}
              disabled={isLoading}
            >
              {isLoading?<div className='flex justify-center gap-3'>
              <Loader className="animate-spin" size={20}/>
              <span className='text-sm font-medium '>Loading...</span>
              </div>:<>

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
