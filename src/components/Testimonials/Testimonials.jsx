import React from "react";
import css from "./Testimonials.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import PageTitle from "../PageTitle/PageTitle";

const Testimonials = ({ testimonials = [] }) => {
  return (
    <div className={css.wrapper}>
      <PageTitle
        title="Testimonials"
        subtitle="What our customer say"
        className={css.title}
      />
      <svg
        className={css.icon}
        width="59"
        height="48"
        viewBox="0 0 59 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 48V31.9412C0 25.9412 1.05672 20.4118 3.17015 15.3529C5.28358 10.2941 8.86468 5.17647 13.9134 0L23.0716 7.2353C20.1363 10.1765 17.9055 12.9412 16.3791 15.5294C14.8527 18.1177 13.8547 20.7647 13.3851 23.4706H24.6567V48H0ZM34.3433 48V31.9412C34.3433 25.9412 35.4 20.4118 37.5134 15.3529C39.6269 10.2941 43.208 5.17647 48.2567 0L57.4149 7.2353C54.4796 10.1765 52.2488 12.9412 50.7224 15.5294C49.196 18.1177 48.198 20.7647 47.7284 23.4706H59V48H34.3433Z"
          fill="#BFBEBE"
        />
      </svg>

      <Swiper
        modules={[Autoplay, Pagination]}
        className={css.carousel}
        pagination={{
          clickable: true,
          renderBullet: function (_, className) {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {testimonials.map(({ id, testimonial, userName }) => (
          <SwiperSlide key={id} className={css.carouselItem}>
            <p className={css.testimonial}>{testimonial}</p>
            <p className={css.subtitle}>{userName}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
