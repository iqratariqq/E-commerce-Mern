import { motion } from 'framer-motion'
import Input from '../Components/Input'
import { useState } from 'react'
import { Lock, User } from 'lucide-react'
import { Link } from "react-router-dom"

const LoginPage = () => {
  const [loginDate, setLoginData] = useState(
    {
      userName: "",
      password: "",

    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()

  }
  return (
    <div className='py-12'>
          <motion.div initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h1 className='text-2xl  font-bold mb-6 text-center  '>
         WellCome Back
        </h1>

      </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=" bg-toupe  text-white bg-opacity-35 max-w-md shadow-lg rounded-sm mx-auto backdrop-blur-xl overflow-hidden"
    >
      <div className='p-6'>

        <form onSubmit={(e) => handleSubmit(e)} >

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
            value={loginDate.userName}
            onChange={(e) => setLoginData({ ...loginDate, userName: e.target.value })}
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
            value={loginDate.password}
            onChange={(e) => setLoginData({ ...loginDate, password: e.target.value })}
            />
            </div>

          <motion.button className='w-full bg-toupe p-3 mt-4 text-xl font-bold  outline-none rounded-md hover:bg-pupkin_spice focus:outline-none focus:ring-2 focus:ring-toupe focus:ring-opacity-35 tansition duration-700 '
            whileHover={{ scale: 1.02 }}
            whileTap={{
              scale: 0.5

            }}
             type='submit'
          >
          Login
          </motion.button>
        </form>


      </div>
      <div className='py-5  flex justify-center items-center  bg-toupe bg-opacity-70 gap-2 rounded-md '>
        <p className=' text-sm '> Don't have an account? </p>
        <Link to={"/signup"} className='hover:underline text-pupkin_spice text-sm'>signUp</Link>
      </div>

    </motion.div>
      </div>
  )
}

export default LoginPage
