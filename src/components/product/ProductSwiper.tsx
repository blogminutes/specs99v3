import { Product } from "@prisma/client";
import ProductCard, {
  ProductCardSkeleton,
} from "~/components/product/ProductCard";
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
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useCartStore } from "~/utils/zustand/cartStore/useCartStore";
import ButtonPrimary from "../ui/buttons/ButtonPrimary";

export type WhereFilterStrings = {
  contains?: string;
  equals?: string;
  not?: string;
  notIn?: string[];
  in?: string[];
};

export type WhereFilterArrays = {
  equals?: string[];
};

export type ProductFilters = {
  categories?: WhereFilterArrays;
  limit?: 12;
  brand?: WhereFilterStrings;
  shape?: WhereFilterStrings;
  model?: WhereFilterStrings;
  idealFor?: WhereFilterStrings;
};

const ProductsSwiper: React.FC<{
  heading: string;
  filters?: ProductFilters;
}> = ({ heading, filters }) => {
  const apiContext = api.useContext();

  const swiperRef = useRef<SwiperCore | null>(null);

  const [products, setProducts] = useState<Product[] | null>(null);

  const { items } = useCartStore((s) => s);

  useEffect(() => {
    const getProducts = async () => {
      const res = await apiContext.products.getProducts.fetch({
        filters: filters,
      });

      setProducts(res.products);
    };

    getProducts();
  }, []);

  const breakpoints = {
    280: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
    1500: {
      slidesPerView: 4,
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
    <div className="max relative flex w-full flex-col gap-[min(3vh,3vw)]">
      <div className="flex items-center justify-between px-[min(1vh,1vw)]">
        <h3 className="text-2xl font-medium max-[600px]:text-lg">{heading}</h3>
        <div className="flex gap-7">
          <span
            onClick={handlePrevSlides}
            className="h-[clamp(3vh,1.5rem,3.5vw)] w-[clamp(3vh,1.5rem,3.5vw)] cursor-pointer rounded-full shadow-primary-sm "
          >
            <CaretLeftIcon className="h-full w-full" color="black" />
          </span>
          <span
            onClick={handleSkipSlides}
            className="h-[clamp(3vh,1.5rem,3.5vw)]  w-[clamp(3vh,1.5rem,3.5vw)] cursor-pointer rounded-full shadow-primary-sm "
          >
            <CaretRightIcon className="h-full  w-full" color="black" />
          </span>
        </div>
      </div>
      <div className="">
        <Swiper
          breakpoints={breakpoints}
          spaceBetween={"0"}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Pagination, Navigation]}
          className="w-full"
          direction={"horizontal"}
          speed={2000}
        >
          {products &&
            products.map((product, i) => (
              <SwiperSlide key={i} className="!h-auto px-[min(1vh,1vw)] py-2">
                <ProductCard product={product} key={product.id} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <ButtonPrimary
        link="/products"
        text="View Range"
        className="mx-auto ml-auto"
      />
    </div>
  );
};

export default ProductsSwiper;
