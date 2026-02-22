import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HeroImage from "../assets/Hero.jpg"
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";


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
<div className="lg:h-[600px] h-[300px] w-full">
  <div
    className="w-full h-full bg-no-repeat"
    style={{
      backgroundImage: `url(${HeroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
  >
  </div>
</div>


  );
}