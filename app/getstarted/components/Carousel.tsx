'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';
import type { TutorialStep } from '../types';

export type CarouselHandle = {
  slideTo: (idx: number) => void;
};

type Props = {
  steps: TutorialStep[];
  setCurrIdx: (idx: number) => void;
};

const Carousel = forwardRef<CarouselHandle, Props>(function Carousel({ steps, setCurrIdx }, ref) {
  const swiperInstance = useRef<SwiperType | null>(null);

  useImperativeHandle(ref, () => ({
    slideTo: (idx: number) => swiperInstance.current?.slideTo(idx),
  }));

  return (
    <div>
      <Swiper
        key={steps[0]?._id ?? 'empty'}
        className="steps"
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 1 }}
        loop={false}
        slidesPerView={1}
        onSwiper={(swiper) => { swiperInstance.current = swiper; }}
        onSlideChange={(swiper) => setCurrIdx(swiper.realIndex)}
      >
        {steps.map((step) => (
          <SwiperSlide key={step._id} className="slide-container">
            <div className="slide-header">
              <p style={{ color: '#F49E4C' }}>{step.order}</p>
              <div style={{ width: 20 }} />
              <p>{step.title}</p>
            </div>
            <div className="slide-contents">
              <p className="slide-contents-text">{step.body}</p>
            </div>
          </SwiperSlide>
        ))}
        <SwiperNavButtons />
      </Swiper>
    </div>
  );
});

export default Carousel;

const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="buttons-container">
      <div className="buttons">
        <button className="custom-prev" onClick={() => swiper.slidePrev()}>
          <TriangleIcon rotation="180deg" />
        </button>
        <button className="custom-next" onClick={() => swiper.slideNext()}>
          <TriangleIcon rotation="0deg" />
        </button>
      </div>
    </div>
  );
};

const TriangleIcon = ({ color = '#355691', rotation = '0deg' }) => (
  <svg
    height="100%"
    viewBox="0 0 24 24"
    style={{ transform: `rotate(${rotation})`, transition: 'fill 0.3s' }}
  >
    <path
      d="M5 3l14 9-14 9V3z"
      fill={color}
      stroke={color}
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </svg>
);
