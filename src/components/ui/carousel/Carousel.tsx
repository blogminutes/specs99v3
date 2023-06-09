import Image, { type StaticImageData } from "next/image";
import React, { useState } from "react";

type ComponentProps = {
  data: {
    image: StaticImageData;
    link?: string;
  }[];
  height: string;
};

const Carousel: React.FC<ComponentProps> = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ minHeight: props.height }}
    >
      {props.data.map((slide, i) => (
        <div
          key={i}
          className="absolute h-full w-full min-w-full shadow-primary-sm transition-[all,2s]"
          style={{ transform: `translateX(${(i - currentSlide) * 100}%)` }}
        >
          <Image
            src={slide.image}
            alt="Hero Image"
            width={1200}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-[3%] left-1/2 flex -translate-x-1/2 gap-2 rounded-md bg-white bg-opacity-70 px-4 py-1 shadow-lg">
        {props.data.map((slide, i) => (
          <span
            key={i}
            className={`bg- h-2 w-2 cursor-pointer rounded-full ${
              currentSlide === i ? "!bg-black" : " bg-gray-500"
            }`}
            onClick={() => {
              setCurrentSlide(i);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
