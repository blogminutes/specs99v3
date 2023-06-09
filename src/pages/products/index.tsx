import Head from "next/head";
import React from "react";
import ContainerMain from "~/components/ui/container/ContainerMain";
import { Product } from "@prisma/client";
import ProductCard, {
  ProductCardSkeleton,
} from "~/components/product/ProductCard";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { Popover } from "@headlessui/react";

const ProductsPage = () => {
  const apiContext = api.useContext();

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const res = await apiContext.products.getProducts.fetch({});

      setProducts(res.products);
    };

    getProducts();
  }, []);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout!);

      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 400); // Adjust the timeout value as per your requirement
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout!);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Products Page</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <ContainerMain className="pb-0">
        <div className="relative flex flex-col">
          <button
            className={`fixed right-[max(2vh,2vw)] top-[calc(6.5rem)] z-30 cursor-pointer rounded-md border border-grey-primary px-4 py-1  ${
              isScrolling ? "opacity-0" : "opacity-100"
            }`}
            style={{ transition: "all .3s" }}
          >
            <span className="flex items-center gap-2 ">
              Filter by <BsFilter className="text-xl" />
            </span>
            <div className="absolute right-0 top-[calc(100%+8px)] h-40 w-[30rem] rounded-xl bg-white shadow-primary-md"></div>
          </button>
          <div className="flex flex-col gap-[min(4vh,4vw)] px-[min(2vh,2vw)] py-10 max-[900px]:gap-[min(12vh,12vw)] max-[600px]:px-[min(3vh,3vw)]">
            <div className="max relative flex w-full flex-col gap-[min(2vh,2vw)]">
              <div className="flex items-center justify-between px-[min(1vh,1vw)]">
                <h3 className="text-2xl font-normal max-[600px]:text-lg">
                  {"Products"}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-4">
              {products &&
                products.map((product, i) => (
                  <SwiperSlide
                    key={i}
                    className="!h-auto px-[min(1vh,1vw)] py-2"
                  >
                    <ProductCard product={product} key={product.id} />
                  </SwiperSlide>
                ))}
            </div>
          </div>{" "}
        </div>
      </ContainerMain>
    </>
  );
};

export default ProductsPage;
