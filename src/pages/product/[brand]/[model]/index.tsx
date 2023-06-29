import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, EffectCube, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

import Image from "next/image";
const ProductInfoPage = () => {
  const [product, setProduct] = useState<null | Product>(null);

  const apiContext = api.useContext();

  const router = useRouter();

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

  return (
    <div className="mx-auto flex w-full grow flex-col gap-[min(8vh,8vw)] py-[min(4vh,4vw)] max-[900px]:gap-[min(12vh,12vw)]">
      {product && (
        <div className="flex">
          <div className="w-[50vw]">
            <Swiper
              effect={"cube"}
              grabCursor={true}
              cubeEffect={{
                shadow: false,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.3,
              }}
              pagination={true}
              loop={true}
              modules={[EffectCube, Pagination]}
            >
              {product &&
                [product.coverImage, ...product.images].map((img) => (
                  <SwiperSlide className="!100%">
                    <Image
                      src={img}
                      alt="Product Image"
                      width={1200}
                      height={1200}
                      className="w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfoPage;
