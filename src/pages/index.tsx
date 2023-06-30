import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Hero1 from "../../public/homepage/hero/hero-1.jpeg";
import Hero2 from "../../public/homepage/hero/hero-2.jpeg";
import RaybanLogo from "../../public/brands/rayban.jpeg";
import LeiaLogo from "../../public/brands/leia.jpeg";
import GucciLogo from "../../public/brands/gucci.jpeg";
import OakleyLogo from "../../public/brands/oakley.jpeg";
import EmporioLogo from "../../public/brands/emporio.jpeg";
import FasktrackLogo from "../../public/brands/fastrack.webp";
import Carousel from "~/components/ui/carousel/Carousel";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  FreeMode,
  Pagination,
  Grid,
  Navigation,
} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";
import ContainerPrimary from "~/components/ui/container/ContainerPrimary";
import ProductsSwiper from "~/components/product/ProductSwiper";

const heroCarouselData = [
  {
    image: Hero1,
  },
  {
    image: Hero2,
  },
  {
    image: Hero1,
  },
];

const heroBrandsLeft = [
  RaybanLogo,
  LeiaLogo,
  GucciLogo,
  EmporioLogo,
  OakleyLogo,
  FasktrackLogo,
];

const heroBrandsRight = [
  GucciLogo,
  EmporioLogo,
  OakleyLogo,
  FasktrackLogo,
  RaybanLogo,
  LeiaLogo,
];

const trends = [
  {
    image: "https://static1.lenskart.com/media/desktop/img/Sep21/image179.png",
    link: "/",
    name: "Round",
  },
  {
    image: "https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg",
    link: "/",
    name: "Cat-Eye",
  },
  {
    image:
      "https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg",
    link: "/",
    name: "Clubmaster",
  },
  {
    image: "https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg",
    link: "/",
    name: "Transparent",
  },
  {
    image: "https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg",
    link: "/",
    name: "Blend Edit",
  },
  {
    image: "https://static1.lenskart.com/media/desktop/img/Sep21/clipon.jpg",
    link: "/",
    name: "Clip On",
  },
  {
    image: "https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg",
    link: "/",
    name: "Blend Edit",
  },
  {
    image: "https://static1.lenskart.com/media/desktop/img/Sep21/image179.png",
    link: "/",
    name: "Round",
  },
  {
    image: "https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg",
    link: "/",
    name: "Cat-Eye",
  },
  {
    image:
      "https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg",
    link: "/",
    name: "Clubmaster",
  },
];

const Home: NextPage = () => {
  const [swiperDirection, setSwiperDirection] = useState("vertical");

  const [sliderGap, setSliderGap] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSwiperDirection("horizontal");
      } else {
        setSwiperDirection("vertcial");
      }
      if (window.innerWidth <= 900) {
        setSliderGap(20);
      } else {
        setSliderGap(30);
      }
    };

    handleResize(); // Initial direction check

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex w-full grow flex-col gap-[min(8vh,8vw)] py-[min(4vh,4vw)] max-[900px]:gap-[min(12vh,12vw)]">
        {/* HERO SECTION */}
        <div className="mx-auto grid w-[100%] grid-cols-[min(12vh,12vw)_1fr_min(12vh,12vw)] overflow-hidden shadow-primary-sm max-[600px]:grid-cols-1">
          <div className="h-[min(50vh,40vw)] px-[min(1vh,1vw)] py-0.5 max-[600px]:h-[min(13vh,13vw)] max-[600px]:p-1.5">
            <Swiper
              direction={swiperDirection as "vertical"}
              slidesPerView={5}
              spaceBetween={sliderGap}
              freeMode={true}
              pagination={false}
              modules={[FreeMode, Pagination, Autoplay]}
              className="h-full w-full"
              speed={2000}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                waitForTransition: true,
              }}
            >
              {heroBrandsLeft.map((image, i) => (
                <SwiperSlide
                  key={i}
                  className="overflow-hidden rounded-lg shadow-primary-xsm"
                >
                  <Image
                    src={image}
                    alt="Brand Image"
                    className="h-full w-full object-cover"
                    width={200}
                    height={200}
                  />
                </SwiperSlide>
              ))}
              {heroBrandsLeft.map((image, i) => (
                <SwiperSlide
                  key={i}
                  className="overflow-hidden rounded-lg shadow-primary-xsm"
                >
                  <Image
                    src={image}
                    alt="Brand Image"
                    className="h-full w-full object-cover"
                    width={200}
                    height={200}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Carousel data={heroCarouselData} height="min(50vh,40vw)" />
          <div className="h-[min(50vh,40vw)] px-[min(1vh,1vw)] py-0.5 max-[600px]:h-[min(13vh,13vw)] max-[600px]:p-1.5">
            <Swiper
              slidesPerView={5}
              spaceBetween={sliderGap}
              freeMode={true}
              pagination={false}
              modules={[FreeMode, Pagination, Autoplay]}
              className="h-full w-full"
              direction={swiperDirection as "vertical"}
              speed={2000}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                waitForTransition: true,
                reverseDirection: true,
                pauseOnMouseEnter: true,
              }}
            >
              {heroBrandsLeft.map((image, i) => (
                <SwiperSlide
                  key={i}
                  className="overflow-hidden rounded-lg shadow-primary-xsm"
                >
                  <Image
                    src={image}
                    alt="Brand Image"
                    className="h-fit object-cover"
                    width={200}
                    height={200}
                  />
                </SwiperSlide>
              ))}
              {heroBrandsRight.map((image, i) => (
                <SwiperSlide
                  key={i}
                  className="overflow-hidden rounded-lg shadow-primary-xsm"
                >
                  <Image
                    src={image}
                    alt="Brand Image"
                    className="h-fit object-cover"
                    width={200}
                    height={200}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <ContainerPrimary>
          <TrendsSection />
        </ContainerPrimary>
        {/* TRENDING SUNGLASSES SECTION*/}

        <ContainerPrimary>
          <ProductsSwiper
            heading="Trending Sunglasses"
            filters={{ categories: { equals: ["Sunglasses"] }, limit: 12 }}
          />
        </ContainerPrimary>
        <ContainerPrimary>
          <ProductsSwiper
            heading="Trending Eyeglasses"
            filters={{ categories: { equals: ["Eyeglasses"] }, limit: 12 }}
          />
        </ContainerPrimary>
      </div>
    </>
  );
};

export default Home;

const TrendsSection = () => {
  const swiperRef = useRef<SwiperCore | null>(null);

  // const [hasPrev,setHasPrev]=useS

  const breakpoints = {
    250: {
      slidesPerView: 2,
      grid: {
        rows: 2,
        fill: "row" as "row" | "column" | undefined,
      },
    },
    350: {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row" as "row" | "column" | undefined,
      },
    },
    780: {
      slidesPerView: 7,
      grid: {
        rows: 1,
        fill: "row" as "row" | "column" | undefined,
      },
    },
  };

  const handleSkipSlides = () => {
    if (!swiperRef.current) return;
    const numSlidesToSkip = 2; // Number of slides to skip
    const currentSlideIndex = swiperRef?.current?.activeIndex || 0;
    const targetSlideIndex = currentSlideIndex + numSlidesToSkip;

    swiperRef?.current.slideTo(targetSlideIndex, 500); // 500ms for transition duration
  };

  const handlePrevSlides = () => {
    if (!swiperRef.current) return;
    const numSlidesToSkip = -2; // Number of slides to skip
    const currentSlideIndex = swiperRef?.current?.activeIndex || 0;
    const targetSlideIndex = currentSlideIndex + numSlidesToSkip;

    console.log(swiperRef?.current?.activeIndex);

    swiperRef?.current.slideTo(targetSlideIndex, 500); // 500ms for transition duration
  };

  return (
    <div className="relative flex w-full flex-col gap-[min(3vh,3vw)]">
      <div className="flex justify-between">
        <h3 className="text-2xl font-medium max-[600px]:text-lg">Trends</h3>
        <div className="flex gap-7">
          <span
            onClick={handlePrevSlides}
            className="h-[clamp(3vh,1.5rem,3vw)] w-[clamp(3vh,1.5rem,3vw)] cursor-pointer rounded-full shadow-primary-sm "
          >
            <CaretLeftIcon className="h-full w-full" color="black" />
          </span>
          <span
            onClick={handleSkipSlides}
            className="h-[clamp(3vh,1.5rem,3vw)] w-[clamp(3vh,1.5rem,3vw)] cursor-pointer rounded-full shadow-primary-sm "
          >
            <CaretRightIcon className="h-full w-full" color="black" />
          </span>
        </div>
      </div>
      <div className="h-fit w-full">
        <Swiper
          breakpoints={breakpoints}
          spaceBetween={"12vw"}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Grid, Pagination, Navigation]}
          className="w-full"
          direction={"horizontal"}
          speed={2000}
          loop={true}
        >
          {trends.map((trend, i) => (
            <SwiperSlide key={i} className="py-2">
              <Link
                href={trend.link}
                className="flex w-full flex-col overflow-hidden rounded-lg shadow-primary-xsm"
              >
                <Image
                  src={trend.image}
                  alt={trend.name}
                  className="max-h-[max(13vh,7vw)] w-full object-cover"
                  width={400}
                  height={400}
                />
                <div className="flex grow items-center justify-center py-0.5">
                  <span className="">{trend.name}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
