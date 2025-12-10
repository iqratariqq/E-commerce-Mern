
import { motion } from 'framer-motion'
import Input from '../Components/Input'
import { useState } from 'react'
import { Lock, Mail, User } from 'lucide-react'
import { Link } from "react-router-dom"

const SignUpPage = () => {
  const [signupDate, setSignupData] = useState(
    {
      userName: "",
      password: "",
      email: ""
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()

  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=" bg-toupe  text-white bg-opacity-35 max-w-md shadow-lg rounded-sm mx-auto mt-20 backdrop-blur-xl overflow-hidden"
    >
      <div className='p-6'>

        <h1 className='text-2xl  font-bold mb-6 text-center  '>
          Create your account
        </h1>

        <form onSubmit={(e) => handleSubmit(e)}>

          <div className="form-controller">
            <label className="label">
              <span className="label-text">UserName</span>
            </label>
          </div>
          <Input
            icon={User}
            label="userName"
            type="userName"
            placeholder="enter your userName"
            value={signupDate.userName}
            onChange={(e) => setSignupData({ ...signupDate, userName: e.target.value })}
          />

          <div className="form-controller">
            <label className="label">
              <span className="label-text">email</span>
            </label>
          </div>
          <Input
            icon={Mail}
            label="email"
            type="email"
            placeholder="enter your mail"
            value={signupDate.email}
            onChange={(e) => setSignupData({ ...signupDate, email: e.target.value })}
          />

          <div className="form-controller">
            <label className="label">
              <span className="label-text">password</span>
            </label>
          </div>
          <Input
            icon={Lock}
            label="password"
            type="password"
            placeholder="******"
            value={signupDate.password}
            onChange={(e) => setSignupData({ ...signupDate, password: e.target.value })}
          />

          <motion.button className='w-full bg-toupe p-3 mt-4 text-xl font-bold  outline-none rounded-md hover:bg-pupkin_spice focus:outline-none focus:ring-2 focus:ring-toupe focus:ring-opacity-35 tansition duration-700 '
            whileHover={{ scale: 1.02 }}
            whileTap={{
              scale: 0.5

            }}
          >
            SignUp
          </motion.button>
        </form>


      </div>
      <div className='py-5  flex justify-center items-center  bg-toupe bg-opacity-70 gap-2 rounded-md '>
        <p className=' text-sm '>have an account? </p>
        <Link to={"/login"} className='hover:underline text-pupkin_spice text-sm'>Login</Link>
      </div>

    </motion.div>
  )
}

export default SignUpPage
