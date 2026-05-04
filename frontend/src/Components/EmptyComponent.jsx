
import { motion } from "framer-motion"
const EmptyComponent = ({icon:Icon,text,color}) => {
  return (
    <motion.div
      initial={{ opacity: 0 , y:-20}}
      animate={{ opacity: 1 ,y:0}}
      transition={{ duration: 0.5 }}
      className="text-center py-10"
    >
      <div className="flex flex-col items-center justify-center ">
      <Icon className={`size-24  mx-auto mb-4 ${color}`} />
      <p className={`${color} text-lg font-medium`}>{text}</p>

      </div>

    </motion.div>
  )
}

export default EmptyComponent
