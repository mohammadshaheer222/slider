// import ChatBot from "react-simple-chatbot";

// const App = () => {
//   return (
//     <>
//       <ChatBot
//         steps={[
//           {
//             id: '1',
//             message: 'What is your name?',
//             trigger: '2',
//           },
//           {
//             id: '2',
//             user: true,
//             trigger: '3',
//           },
//           {
//             id: '3',
//             message: 'Hi {previousValue}, nice to meet you!',
//             end: true,
//           },
//         ]}
//       />
//     </>
//   );
// };

// export default App;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const sliderRef = useRef(null);

  // Refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // This is relative to the viewport
      threshold: 0.5, // 50% of the section needs to be in view
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'home') {
            sliderRef.current.slickGoTo(0); // Go to the first slide (Home)
          } else if (entry.target.id === 'about') {
            sliderRef.current.slickGoTo(1); // Go to the second slide (About)
          } else if (entry.target.id === 'service') {
            sliderRef.current.slickGoTo(2); // Go to the third slide (Service)
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (homeRef.current) observer.observe(homeRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (serviceRef.current) observer.observe(serviceRef.current);

    return () => {
      if (homeRef.current) observer.unobserve(homeRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (serviceRef.current) observer.unobserve(serviceRef.current);
    };
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div id="home" ref={homeRef} className="h-screen bg-yellow-200">
          Body Section
        </div>
      {/* Fixed Slider */}
      <div className="">
        <Slider {...settings} ref={sliderRef}>
          <div className="px-6 py-2 bg-gray-200">
            <h1>Home</h1>
          </div>
          <div className="px-6 py-2 bg-gray-200">
            <h1>About About About</h1>
          </div>
          <div className="px-6 py-2 bg-gray-200">
            <h1>Service</h1>
          </div>
        </Slider>
      </div>

      {/* Page content sections */}
      <div className="">
        <div id="home" ref={homeRef} className="h-screen bg-red-200">
          Home Section
        </div>

        <div id="about" ref={aboutRef} className="h-screen bg-green-200">
          About Section
        </div>

        <div id="service" ref={serviceRef} className="h-screen bg-yellow-200">
          Service Section
        </div>
      </div>
    </div>
  );
}
