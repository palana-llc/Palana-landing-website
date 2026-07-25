'use client';

import { useRef, useState } from 'react';
import StepsCarousel from './StepsCarousel';
import Features from './Features';
import Products from './Products';
import type { TutorialStep, LaptopFeature } from '../types';

type Props = {
  studentsSteps: TutorialStep[];
  schoolsSteps: TutorialStep[];
  features: LaptopFeature[];
};

export default function GetStartedContent({ studentsSteps, schoolsSteps, features }: Props) {
  const stepsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState('Students');

  return (
    <>
      <StepsCarousel ref={stepsRef} studentsSteps={studentsSteps} schoolsSteps={schoolsSteps} mode={mode} setMode={setMode} />
      <Features ref={featuresRef} features={features} />
      <Products refs={[stepsRef, featuresRef]} setMode={setMode} />
    </>
  );
}
