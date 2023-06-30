import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, EffectCube, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import ReactStars from "react-stars";
import ProductsSwiper from "~/components/product/ProductSwiper";
import ContainerPrimary from "~/components/ui/container/ContainerPrimary";
const ProductInfoPage = () => {
  const [product, setProduct] = useState<null | Product>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const apiContext = api.useContext();

  const router = useRouter();

  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const res = await apiContext.products.getProduct.fetch({
        filters: {
          brand: router.query.brand as string,
          model: router.query.model as string,
        },
      });
      setProduct(res.products || null);
    };

    if (router.query.brand && router.query.model) getProducts();
  }, [router.query]);

  const handleSkipSlides = () => {
    if (!swiperRef.current) return;
    const numSlidesToSkip = 1; // Number of slides to skip
    const currentSlideIndex = swiperRef?.current?.activeIndex || 0;
    const targetSlideIndex = currentSlideIndex + numSlidesToSkip;
    setActiveIndex(targetSlideIndex);

    swiperRef?.current.slideTo(targetSlideIndex, 500); // 500ms for transition duration
  };

  const handlePrevSlides = () => {
    if (!swiperRef.current) return;
    const numSlidesToSkip = -1; // Number of slides to skip
    const currentSlideIndex = swiperRef?.current?.activeIndex || 0;
    const targetSlideIndex = currentSlideIndex + numSlidesToSkip;
    setActiveIndex(targetSlideIndex);

    swiperRef?.current.slideTo(targetSlideIndex, 500); // 500ms for transition duration
  };

  const productImages = [product?.coverImage, ...(product?.images || [])];

  return (
    <div className="mx-auto flex w-full grow flex-col gap-[min(8vh,8vw)] bg-white max-[900px]:gap-[min(12vh,12vw)]">
      {product && (
        <div className="flex border-b px-[min(3vh,3vw)] pb-4 max-[900px]:flex-col">
          <div className="relative w-[60%] pb-5 max-[900px]:w-[100%]">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              effect={"cube"}
              grabCursor={true}
              cubeEffect={{
                shadow: false,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.3,
              }}
              // pagination={true}
              loop={true}
              modules={[EffectCube, Pagination]}
            >
              {product &&
                [product.coverImage, ...product.images].map((img, i) => (
                  <SwiperSlide className="!100%" key={i}>
                    <Image
                      src={img}
                      alt="Product Image"
                      width={1200}
                      height={1200}
                      className="max-h-[max(35vh,30vw)] w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute left-1/2 top-1/2 z-50 flex w-[90%] -translate-x-1/2 -translate-y-1/2 justify-between gap-7">
              <span
                onClick={handlePrevSlides}
                className="h-[clamp(3vh,1.5rem,3.5vw)] w-[clamp(3vh,1.5rem,3.5vw)] cursor-pointer rounded-full bg-bg-primary shadow-primary-sm "
              >
                <CaretLeftIcon className="h-full w-full" color="black" />
              </span>
              <span
                onClick={handleSkipSlides}
                className="h-[clamp(3vh,1.5rem,3.5vw)]  w-[clamp(3vh,1.5rem,3.5vw)] cursor-pointer rounded-full bg-bg-primary shadow-primary-sm "
              >
                <CaretRightIcon className="h-full  w-full" color="black" />
              </span>
            </div>
            <div
              className={`z-50 grid w-full gap-2 rounded-md px-[min(3vh,3vw)] py-1`}
              style={{
                gridTemplateColumns: `repeat(${productImages.length},1fr)`,
              }}
            >
              {[product.coverImage, ...product.images].map((img, i) => (
                <Image
                  alt="Product Image"
                  src={img}
                  key={i}
                  width={150}
                  height={150}
                  className={`w-full cursor-pointer rounded-lg object-cover shadow-primary-xsm ${
                    swiperRef.current && swiperRef.current.activeIndex === i
                      ? "border-[2px] border-secondary"
                      : " bg-white"
                  }`}
                  onClick={() => {
                    if (!swiperRef.current) return;
                    const targetSlideIndex = i;
                    setActiveIndex(i);
                    swiperRef?.current.slideTo(targetSlideIndex, 500);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="my-auto flex w-full grow flex-col gap-[min(3vh,3vw)] px-[min(3vh,3vw)]">
            <div className="flex flex-col  gap-[min(.8vh,.8vw)]">
              {/* <span className="h-[1px] w-full bg-[rgb(229,231,235)]"></span> */}
              <h1 className="flex flex-col text-lg text-grey-light">
                {product.brand}{" "}
                <span className="text-xl font-normal text-grey-medium">
                  {product.model}
                </span>
              </h1>
              <span className="font-medium">
                <span className="text-grey-light ">Size:</span> {product.size}
              </span>
              <div className="-mt-0.5 mb-0.5 flex items-center gap-2">
                <span className=" bg-clip-text text-2xl font-medium text-grey-medium">
                  {product.price}{" "}
                </span>
                <span className="relative text-lg">
                  {product.mrp}
                  <span className="absolute left-[52%] top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 bg-red-500"></span>
                </span>
                <span className="text-base font-medium text-green-600">
                  ({Math.floor(100 - (product.price / product.mrp) * 100)}% off)
                </span>
              </div>
              <span className=" -mt-1 flex items-center gap-1 text-[12px]">
                <ReactStars
                  count={5}
                  // onChange={ratingChanged}
                  size={14}
                  value={4.5}
                  color2={"#ffd700"}
                />{" "}
                (121)
              </span>
            </div>
            <span className="h-[1px] w-full bg-[rgb(229,231,235)]"></span>
            <div className="grid grid-cols-2 gap-1 text-base">
              <span className="">
                <span className="text-grey-light ">For:</span> {product.gender}
              </span>
              <span className="">
                <span className="text-grey-light ">Lens:</span> {product.lens}
              </span>
              <span className="">
                <span className="text-grey-light ">Lens Color:</span>{" "}
                {product.lensColor}
              </span>
              <span className="">
                <span className="text-grey-light ">Frame Body:</span>{" "}
                {product.frameBody}
              </span>
              <span className="">
                <span className="text-grey-light ">Frame Color:</span>{" "}
                {product.frameColor}
              </span>
            </div>
            <span className="h-[1px] w-full bg-[rgb(229,231,235)]"></span>
            <div>
              <span className="">
                <span className="text-grey-light ">Description:</span>{" "}
                {product.description}
              </span>
            </div>
            <span className="h-[1px] w-full bg-[rgb(229,231,235)]"></span>
            <div className="relative">
              <button className="relative z-40 mx-auto w-full rounded-full bg-white bg-gradient-to-b from-primary to-secondary bg-clip-text py-[min(.8vh,.8vw)] text-lg font-medium text-transparent shadow-primary-sm">
                Add To Cart
              </button>
              {/* <span className="absolute left-0 top-0 z-[0] block h-[calc(100%+2px)] w-[calc(100%+2px)] bg-gradient-to-b from-primary to-secondary"></span> */}
            </div>
          </div>
        </div>
      )}
      <ContainerPrimary>
        {product && (
          <ProductsSwiper
            heading="Related Products"
            filters={{
              categories: { equals: [...product?.categories] },
            }}
          />
        )}{" "}
      </ContainerPrimary>

      <ContainerPrimary>
        {product && (
          <ProductsSwiper
            heading={`More From ${product.brand}`}
            filters={{ brand: { equals: product.brand } }}
          />
        )}{" "}
      </ContainerPrimary>
      {/* <ContainerPrimary>
        {product && (
          <ProductsSwiper
            heading={`Similar Shapes`}
            // filters={{ shape: product.shape }}
          />
        )}{" "}
      </ContainerPrimary> */}
    </div>
  );
};

export default ProductInfoPage;
