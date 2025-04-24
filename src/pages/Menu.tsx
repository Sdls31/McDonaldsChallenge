import { useState } from "react";
import { Layout } from "../components/Layout";
import { menu, verticalMenuItems } from "../types/MenuDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AvatarApp } from "../components/AvatarApp";
import { DialogBox } from "../components/DialogBox";
import { useAvatar } from "../context/AvatarContext";

interface GridMenuProps {
  onTitleChange: (title: string) => void;
}

const GridMenu: React.FC<GridMenuProps> = ({ onTitleChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedAnimation, setSelectedAnimation] = useState<number>(0);
  const currentItem = verticalMenuItems.Items[selectedAnimation];
  const menuKey = currentItem?.key as keyof typeof menu;
  const items = menu[menuKey] ?? [];
  const { isAvatar } = useAvatar();

  const avatarPosition = {
    top: "1100px",
    left: "55px",
  };
  const positionDialogBox = {
    top: "60rem",
    left: "15rem",
  };

  return (
    <>
      {isAvatar && (
        <>
          <AvatarApp position={avatarPosition} />
          <DialogBox
            text="Crispy and Golden?"
            side="left"
            positionAvatar={positionDialogBox}
            size="large"
          />
        </>
      )}
      <div className="max-h-[800px] overflow-hidden grid grid-cols-5 grid-rows-5 gap-2">
        <div className="row-span-5 relative z-20 flex items-center justify-content">
          <div className="relative h-[25rem] w-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <Swiper
              onSlideChange={(swiper) => {
                const newIndex = swiper.realIndex;
                setSelectedAnimation(newIndex);
                const title = verticalMenuItems.Items[newIndex]?.title;
                if (title) onTitleChange(title);
              }}
              direction="vertical"
              slidesPerView={4}
              loop={true}
              pagination={{ clickable: true }}
              centeredSlides={true}
              modules={[Pagination, Navigation]}
              className="grid-swiper h-full w-full"
            >
              {verticalMenuItems.Items.map((item) => (
                <SwiperSlide
                  key={item.title}
                  className="flex justify-center items-center"
                >
                  {({ isActive }) => (
                    <div
                      className={`flex flex-col items-center py-4 gap-2 w-full transition-all duration-300 ${
                        !isActive ? "opacity-60" : "opacity-100"
                      }`}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className={`transition-all duration-300 ${
                          isActive ? "w-[65px]" : "w-[55px]"
                        }`}
                      />
                      <p
                        className={`text-center font-[var(--font-global)] font-semibold text-[#4F4F4F] transition-all duration-300 ${
                          isActive ? "text-[15px]" : "text-[12px]"
                        }`}
                      >
                        {t(item.title)}
                      </p>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
          </div>
        </div>

        <div className="col-span-4 row-span-5 flex justify-center items-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4 min-h-[35rem]">
            {items.length > 0 ? (
              items.slice(0, 9).map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    item.link &&
                    navigate(item.link, {
                      state: {
                        product: { name: item.title },
                      },
                    })
                  }
                  className="bg-white rounded-md shadow-md flex flex-col items-center justify-center w-full min-w-[10rem] max-w-[10rem] h-[10rem] overflow-hidden"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <p className="text-center mt-2 font-[var(--font-global)] text-[15px] font-bold text-[#4F4F4F] px-2 leading-snug line-clamp-2">
                    {t(item.title)}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-3 row-span-3 text-center text-gray-600 font-medium flex items-center justify-center">
                {t("No items")}
              </div>
            )}
          </div>
        </div>

        <style>
          {`
            .swiper-pagination {
              bottom: 2rem !important;
            }

            .swiper, .swiper-slide {
              touch-action: pan-y;
              -webkit-overflow-scrolling: touch;
            }

            .grid-swiper .swiper-pagination {
              top: 50% !important;
              right: 0.5rem !important;
              transform: translateY(-50%) !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
              align-items: center !important;
              gap: 0rem !important;
            }
          `}
        </style>
      </div>
    </>
  );
};

export const Menu = () => {
  const [title, setTitle] = useState<string>("");

  return (
    <Layout
      Component={<GridMenu onTitleChange={setTitle} />}
      Title={title}
      BackStep="/"
    />
  );
};
