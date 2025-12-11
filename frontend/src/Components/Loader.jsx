import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="min-h-screen bg-pupkin_spice  text-white relative overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute left-1/2 top-0  w-full h-full -translate-x-1/2
             bg-[radial-gradient(ellipse_at_top,rgba(255,180,120,0.35)_0%,rgba(239,200,26,0.15)_45%,rgba(0,0,0,0)_100%)]"
          ></div>
        </div>

      </div>
      <motion.div
        className="w-6 h-6 border-4 border-t-orange-500 border-orange-200 rounded-full"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;
