"use client";

import ChervonButton from "@/components/chervon";
import BaseImage from "@/components/image";
import { useRef } from "react";
import { Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

const imgs = [
  "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
  "https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj",
];

const Banner = () => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <Swiper
      spaceBetween={50}
      lazyPreloadPrevNext={1}
      loop
      className="group h-56 sm:h-[500px] overflow-hidden w-full"
      modules={[Navigation, Mousewheel]}
      mousewheel={true}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onInit={(swiper: SwiperClass) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        swiper.params.navigation.nextEl = navigationNextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
    >
      {imgs.map((i, idx) => (
        <SwiperSlide key={`hero-${i}-${idx}`} className="overflow-hidden rounded-md">
          <BaseImage
            src={i}
            width="100%"
            height={100}
            className="object-cover object-center w-full"
          />
        </SwiperSlide>
      ))}

      <ChervonButton
        ref={navigationNextRef}
        direction="right"
        className="opacity-0 transition-opacity group-hover:opacity-100"
      />
      <ChervonButton
        ref={navigationPrevRef}
        direction="left"
        className="opacity-0 transition-opacity group-hover:opacity-100"
      />
    </Swiper>
  );
};

export default Banner;
