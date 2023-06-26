import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

type ComponentProps = {
  data: {
    image: StaticImageData;
    link?: string;
  }[];
  height: string;
};

const Carousel: React.FC<ComponentProps> = (props) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ minHeight: props.height }}
    >
      {props.data.map((slide, i) => (
        <div
          className="absolute h-full w-full min-w-full shadow-sm transition-[all,2s]"
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
            className={`bg- h-2 w-2 cursor-pointer rounded-full bg-gray-500 ${
              currentSlide === i && "!bg-black"
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
