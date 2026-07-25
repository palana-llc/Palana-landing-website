'use client';

import Carousel from './Carousel';
import type { CarouselHandle } from './Carousel';
import './Steps.css';
import { useState, useRef, forwardRef } from 'react';
import PhoneScreen from './PhoneScreen';
import ModeButton from './ModeButton';
import StepButton from './StepButton';
import type { TutorialStep } from '../types';
import Divider from '../../components/Divider';

type Props = {
  studentsSteps: TutorialStep[];
  schoolsSteps: TutorialStep[];
  mode: string;
  setMode: (mode: string) => void;
};

const StepsCarousel = forwardRef<HTMLDivElement, Props>(function StepsCarousel({ studentsSteps, schoolsSteps, mode, setMode }, ref) {
  const [currIdx, setCurrIdx] = useState(0);
  const carouselRef = useRef<CarouselHandle>(null);

  const activeSteps = mode === 'Schools' ? schoolsSteps : studentsSteps;
  const currentImageUrl = activeSteps[currIdx]?.phoneScreenImageUrl ?? null;
  const activeColor = mode === 'Schools' ? '#66BDDA' : '#92E086';

  return (
    <div ref={ref} className="steps-container">
      <div className="steps-container-inner">
        <div className="GS-container" style={{ backgroundColor: activeColor }}>
          <div className="phone-bookmark-container">
            <div className="phone-box">
              <PhoneScreen src={currentImageUrl} />
            </div>
            <div className="step-shortcuts">
              {activeSteps.map((step, idx) => (
                <StepButton
                  key={step._id}
                  stepNumber={step.order}
                  title={step.title}
                  isActive={currIdx === idx}
                  onClick={() => {
                    setCurrIdx(idx);
                    carouselRef.current?.slideTo(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="GS-container">
          <div className="steps-box">
            <ModeButton mode={mode} setMode={setMode} setCurrIdx={setCurrIdx} />
            <Carousel
              ref={carouselRef}
              steps={activeSteps}
              setCurrIdx={setCurrIdx}
            />
          </div>
        </div>
      </div>

      <Divider></Divider>
    </div>
  );
});

export default StepsCarousel;
