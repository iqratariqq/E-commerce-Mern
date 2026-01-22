import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HeroImage from "../assets/Citrus Orange Accent Wall for Modern Energy - 20 Orange Accent Wall Ideas for Bold Interior"


import AOS from "aos"
import { useEffect } from "react";
import "aos/dist/aos.css"
export default function Hero() {


  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',

    });
    AOS.refresh();

  }, [])

  return (
    <div className="h-[600px] flex justify-center mt-15.5">
      <div style={{ backgroundImage: `url${HeroImage}` }}>

      </div>

    </div>

  );
}