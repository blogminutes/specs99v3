import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Hero1 from "../../public/homepage/hero/hero-1.jpeg";
import Hero2 from "../../public/homepage/hero/hero-2.jpeg";
import RaybanLogo from "../../public/brands/rayban.jpeg";
import LeiaLogo from "../../public/brands/leia.jpeg";
import GucciLogo from "../../public/brands/gucci.jpeg";
import OakleyLogo from "../../public/brands/oakley.jpeg";
import Carousel from "~/components/ui/carousel/Carousel";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

const heroBrandsLeft = [RaybanLogo, LeiaLogo, GucciLogo, OakleyLogo];

const heroBrandsRight = [GucciLogo, OakleyLogo, RaybanLogo, LeiaLogo];

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSwiperDirection("horizontal");
      } else {
        setSwiperDirection("vertcial");
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
      <main className="mx-auto flex w-full flex-col gap-[min(10vh,10vw)] px-[min(4vh,4vw)] py-[min(6vh,6vw)]">
        {/* HERO SECTION */}
        <div className="mx-auto grid w-[100%] grid-cols-[1fr_9fr_1fr] overflow-hidden rounded-lg shadow-primary-sm max-[600px]:grid-cols-1">
          <div className="h-[min(50vh,50vw)] px-[min(1vh,1vw)] py-0.5 max-[600px]:h-[min(10vh,10vw)] max-[600px]:p-1.5">
            <Swiper
              direction={swiperDirection as "vertical"}
              slidesPerView={4}
              spaceBetween={30}
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
          <Carousel data={heroCarouselData} height="min(50vh,50vw)" />
          <div className="h-[min(50vh,50vw)] px-[min(1vh,1vw)] py-0.5 max-[600px]:h-[min(10vh,10vw)] max-[600px]:p-1.5">
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
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
              {heroBrandsRight.map((image, i) => (
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
        </div>

        <TrendsSection />
        {/* TRENDING SUNGLASSES SECTION*/}
        <div className="flex h-80 w-full flex-col gap-8">
          <h3 className="text-3xl font-medium">Top Sunglasses</h3>
          <div className="flex gap-8"></div>
        </div>
      </main>
    </>
  );
};

export default Home;

const TrendsSection = () => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const breakpoints = {
    300: {
      slidesPerView: 4,
    },
    780: {
      slidesPerView: 6,
    },
  };

  const handleSkipSlides = () => {
    if (!swiperRef.current) return;
    const numSlidesToSkip = 3; // Number of slides to skip
    const currentSlideIndex = swiperRef?.current?.activeIndex || 0;
    const targetSlideIndex = currentSlideIndex + numSlidesToSkip;

    swiperRef?.current.slideTo(targetSlideIndex, 500); // 500ms for transition duration
  };

  const handlePrevSlides = () => {
    if (!swiperRef.current) return;
    const numSlidesToSkip = -3; // Number of slides to skip
    const currentSlideIndex = swiperRef?.current?.activeIndex || 0;
    const targetSlideIndex = currentSlideIndex + numSlidesToSkip;

    swiperRef?.current.slideTo(targetSlideIndex, 500); // 500ms for transition duration
  };

  return (
    <div className="flex w-full flex-col gap-[min(3vh,3vw)]">
      <h3 className="text-3xl font-medium">Trends</h3>
      <div className="h-fit w-full">
        <Swiper
          breakpoints={breakpoints}
          spaceBetween={"10vw"}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          freeMode={true}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
          direction={"horizontal"}
          speed={2000}
          // wrapperClass="gap-[min(4vh,4vw)]"
        >
          {trends.map((trend, i) => (
            <SwiperSlide key={i} className="py-6">
              <Link
                href={trend.link}
                className="flex w-full flex-col overflow-hidden rounded-lg shadow-primary-sm"
              >
                <Image
                  src={trend.image}
                  alt={trend.name}
                  className="h-[max(6vh,6vw)] w-full object-cover"
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

        <div>
          <span onClick={handlePrevSlides}>prev</span>
          <span onClick={handleSkipSlides}>next</span>
        </div>
      </div>
    </div>
  );
};
