import React, { useState, useEffect } from "react";
import style from "./Slider.css";

const Slider = () => {
  const [counter, setCounter] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561908818-526e64312efd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1503437313881-503a91226402?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1497493292307-31c376b6e479?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1663134285459-0022b0e78970?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const imageCarousel =
      document.getElementById("image-carousel") ??
      document.createElement("div");
    imageCarousel.innerHTML = "";

    images.forEach((slide, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = slide;
      imgElement.alt = `slide-${index}`;
      imgElement.style.left = `${index * 100}%`;
      imgElement.style.width = "84px";
      imgElement.style.height = "84px";
      imageCarousel.appendChild(imgElement);
    });
  }, [images]);

  const slideImage = () => {
    const imageCarousel = document.getElementById("image-carousel");
    if (imageCarousel) {
      imageCarousel.style.transform = `translateX(-${counter * 100}%)`;
    }
  };

  const prev = () => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  const next = () => {
    if (counter < images.length - 1) {
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  useEffect(() => {
    slideImage();
  }, [counter]);

  return (
    // <div id="main" className={style.main}>
    <div id="wrapper" className={style.wrapper}>
      <div>
        <button className="active" id="prev" onClick={prev}>
          &lt;
        </button>
      </div>
      <div id="image-container" className={style.imageContainer}>
        <div id="image-carousel" className={style.imageCarousel}></div>
      </div>
      <div>
        <button className="active" id="next" onClick={next}>
          &gt;
        </button>
      </div>
    </div>
    // </div>
  );
};

export default Slider;
