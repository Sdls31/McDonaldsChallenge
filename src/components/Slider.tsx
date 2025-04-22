import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

interface Promotion {
  id: number;
  image: string;
}

const Slider = () => {
  const promotions: Promotion[] = [
    { id: 1, image: "src/assets/BigMacCombo.svg" },
    { id: 2, image: "src/assets/QuarterPounder.svg" },
    { id: 3, image: "src/assets/McNuggets.svg" },
  ];

  return (
    <>
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 w-full h-[29%] z-[-1]">
          <img
            src="src/assets/RedCurves.svg"
            className="w-full h-full object-cover"
            alt="Red Curve"
          />
        </div>
        <div className="absolute top-0 w-full h-[29%] flex items-center justify-center">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className="promo-swiper w-full h-full"
          >
            {promotions.map((promotion) => (
              <SwiperSlide
                key={promotion.id}
                className="flex justify-center items-center"
              >
                <img
                  src={promotion.image}
                  className="w-full object-contain h-[17rem]"
                  alt={`Promotion ${promotion.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <img
          src="src/assets/McDonalds.svg"
          className="absolute top-0 left-0 z-20 p-[1rem] w-[7.5rem]"
          alt="Logo"
        />
        <style>
          {`
          .promo-swiper .swiper-pagination {
            bottom: 2rem !important;
          }

          .promo-swiper, .promo-swiper .swiper-slide {
            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;
          }
        `}
        </style>
      </div>
    </>
  );
};

export default Slider;
