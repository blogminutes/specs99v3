import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import ReactStars from "react-stars";
import ProductsSwiper from "~/components/product/ProductSwiper";
import ContainerPrimary from "~/components/ui/container/ContainerPrimary";
import ContainerMain from "~/components/ui/container/ContainerMain";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { useSession } from "next-auth/react";
import {
  addToCart,
  useCartStore,
} from "~/utils/zustand/cartStore/useCartStore";
import { MdAdd } from "react-icons/md";
import { GrFormSubtract } from "react-icons/gr";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductInfoPage = () => {
  const [product, setProduct] = useState<null | Product>(null);

  const [productImages, setProductImages] = useState<string[] | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const apiContext = api.useContext();

  const { data } = useSession();

  const cartStore = useCartStore((c) => c);

  const { id: cartId, cartIsLoading } = cartStore;

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
    const targetSlideIndex =
      swiperRef?.current?.activeIndex === (productImages?.length || 0) - 1
        ? 0
        : currentSlideIndex + numSlidesToSkip;
    setActiveIndex(targetSlideIndex);

    swiperRef?.current.slideTo(targetSlideIndex, 500); // 500ms for transition duration
  };

  const handlePrevSlides = () => {
    if (!swiperRef.current) return;
    const numSlidesToSkip = -1; // Number of slides to skip
    const currentSlideIndex = swiperRef?.current?.activeIndex || 0;
    const targetSlideIndex =
      swiperRef?.current?.activeIndex === 0
        ? productImages?.length || 0
        : currentSlideIndex + numSlidesToSkip;
    setActiveIndex(targetSlideIndex);

    swiperRef?.current.slideTo(targetSlideIndex, 500); // 500ms for transition duration
  };

  const handleAddToCart = () => {
    if (data?.user.id && cartId && product) {
      addToCart({
        apiContext,
        cartId,
        cartStore,
        product,
        quantity: quantity,
      });
    }
  };

  useEffect(() => {
    if (product) setProductImages([product?.coverImage, ...product?.images]);
  }, [product]);

  return (
    <ContainerMain className="pt-0">
      {product && (
        <div className="flex border-b pb-[min(6vh,6vw)] max-[900px]:flex-col ">
          <div className="relative w-[60%] pb-[min(6vh,6vw)] max-[900px]:w-[100%]">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              // effect={"fade"}
              // pagination={true}
              loop={true}
              modules={[Pagination, Navigation]}
              slidesPerView={1}
            >
              {productImages &&
                productImages.map((img, i) => (
                  <SwiperSlide className="!100%" key={i}>
                    <Image
                      src={img}
                      alt="Product Image"
                      width={1200}
                      height={1200}
                      className="max-h-[max(35vh,35vw)] w-full object-cover max-[600px]:max-h-[max(45vh,40vw)]"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute left-1/2 top-[40%] z-20 flex w-[90%] -translate-x-1/2 -translate-y-1/2 justify-between gap-7">
              <span
                onClick={handlePrevSlides}
                className="h-[clamp(3vh,1.2rem,3vw)] w-[clamp(3vh,1.5rem,3vw)] cursor-pointer rounded-full bg-bg-primary shadow-primary-sm "
              >
                <CaretLeftIcon className="h-full w-full" color="black" />
              </span>
              <span
                onClick={handleSkipSlides}
                className="h-[clamp(3vh,1.2rem,3vw)]  w-[clamp(3vh,1.5rem,3vw)] cursor-pointer rounded-full bg-bg-primary shadow-primary-sm "
              >
                <CaretRightIcon className="h-full  w-full" color="black" />
              </span>
            </div>
            <div
              className={`z-50 grid w-full gap-2 rounded-md px-[min(3vh,3vw)] pt-6`}
              style={{
                gridTemplateColumns: `repeat(${productImages?.length},1fr)`,
              }}
            >
              {productImages &&
                productImages.map((img, i) => (
                  <Image
                    alt="Product Image"
                    src={img}
                    key={i}
                    width={150}
                    height={150}
                    className={`w-full cursor-pointer rounded-lg object-cover ${
                      swiperRef.current && swiperRef.current.activeIndex === i
                        ? "border-[2px] shadow-primary-sm"
                        : "shadow-primary-xsm"
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
          <div className="my-auto flex w-full grow flex-col gap-[min(3vh,3vw)] px-[min(3vh,3vw)] py-[min(3vh,3vw)]">
            <div className="flex flex-col  gap-[min(.8vh,.8vw)]">
              {/* <span className="h-[1px] w-full bg-[rgb(229,231,235)]"></span> */}
              <h1 className="flex flex-col text-base text-grey-light">
                {product.brand}{" "}
                <span className="text-lg font-normal text-grey-medium">
                  {product.model}
                </span>
              </h1>
              <span className="text-sm  text-grey-medium">
                <span className="font-medium  text-grey-primary">Size:</span>{" "}
                {product.size}
              </span>
              <div className="-mt-0.5 mb-0.5 flex items-center gap-2">
                <span className=" bg-clip-text text-xl font-medium text-grey-medium">
                  {product.price}{" "}
                </span>
                <span className="relative text-base">
                  {product.mrp}
                  <span className="absolute left-[52%] top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 bg-red-500"></span>
                </span>
                <span className="text-sm font-medium text-green-700">
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
            <div className="grid grid-cols-2 gap-1 text-sm">
              <span className="text-grey-medium">
                <span className="font-medium  text-grey-primary">For:</span>{" "}
                {product.gender}
              </span>
              <span className="text-grey-medium">
                <span className="font-medium  text-grey-primary">Lens:</span>{" "}
                {product.lens}
              </span>
              <span className="text-grey-medium">
                <span className="font-medium  text-grey-primary">
                  Lens Color:
                </span>{" "}
                {product.lensColor}
              </span>
              <span className="text-grey-medium">
                <span className="font-medium  text-grey-primary">
                  Frame Body:
                </span>{" "}
                {product.frameBody}
              </span>
              <span className="text-grey-medium">
                <span className="font-medium  text-grey-primary">
                  Frame Color:
                </span>{" "}
                {product.frameColor}
              </span>
            </div>
            <span className="h-[1px] w-full bg-[rgb(229,231,235)]"></span>

            <div className="relative flex w-full flex-col justify-start gap-4">
              <div className="flex items-center gap-3 text-grey-medium">
                <span
                  onClick={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded-full border"
                >
                  <GrFormSubtract className="cursor-pointer text-lg text-grey-medium" />
                </span>
                <span className="text-sm font-medium">{quantity}</span>
                <span
                  onClick={() => {
                    if (quantity < 20) setQuantity(quantity + 1);
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded-full border"
                >
                  <MdAdd className="cursor-pointer text-lg" />
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={cartIsLoading}
                className={`relative z-40 flex w-full items-center justify-center gap-2 rounded-full border border-grey-medium px-8 py-[min(.8vh,.8vw)] text-base font-normal text-grey-medium shadow-primary-xsm ${
                  cartIsLoading && "opacity-50"
                }`}
              >
                Add To Cart
                <BsCart2 className="text-xl text-secondary" />
              </button>
              <button className="relative z-40 flex w-full items-center justify-center gap-2 rounded-full border border-grey-light bg-white px-8 py-[min(.8vh,.8vw)] text-base font-normal text-grey-light shadow-primary-xsm">
                Add To Whishlist
                <AiOutlineHeart className="text-lg text-red-500" />
              </button>
            </div>
            <span className="h-[1px] w-full bg-[rgb(229,231,235)]"></span>
            <div>
              <span className="text-sm text-grey-medium">
                <span className="font-medium  text-grey-primary">
                  Description:
                </span>{" "}
                {product.description}
              </span>
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
              model: { not: product.model },
            }}
          />
        )}{" "}
      </ContainerPrimary>

      <ContainerPrimary>
        {product && (
          <ProductsSwiper
            heading={`More From ${product.brand}`}
            filters={{
              brand: { equals: product.brand },
              model: { not: product.model },
            }}
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
    </ContainerMain>
  );
};

export default ProductInfoPage;
