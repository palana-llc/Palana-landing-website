'use client';

import './Features.css';
import FeatureButton from './FeatureButton';
import { useState, forwardRef } from 'react';
import PhoneScreen from './PhoneScreen';
import LaptopScreen from './LaptopScreen';
import Globe2 from '../images/Globe2.png';
import Image from 'next/image';
import { resolveIcon } from '../iconMap';
import type { LaptopFeature } from '../types';

import Divider from '../../components/Divider';

type Props = {
  features: LaptopFeature[];
};

const Features = forwardRef<HTMLDivElement, Props>(function Features({ features }, ref) {
  const [idClicked, setIdClicked] = useState<string | null>(null);

  const clickedFeature = features.find(f => f._id === idClicked) ?? null;
  const currentImageUrl = clickedFeature?.laptopScreenImageUrl ?? null;

  return (
    <div ref={ref} className="features-container">
      <div className="features-header">
        Dispatch Website
      </div>
      <div className="features-subheader">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget tortor rutrum, tristique nunc in, luctus leo. 
      </div>

      <div className="features-group-container">
        <div className="features-group"
          style={{ transform: 'rotateY(180deg) scaleY(-1)' }}>
          {features.slice(0, 3).map((feature) => (
            <FeatureButton
              key={feature._id}
              Icon={resolveIcon(feature.iconName)}
              label={feature.label}
              side="L"
              thisClicked={idClicked === feature._id}
              setIdClicked={() => {
                setIdClicked(idClicked === feature._id ? null : feature._id);
              }}
            />
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 230,
        width: 901,
        height: 470,
      }}>
        <LaptopScreen src={currentImageUrl} />
      </div>

      <div className="features-group-container">
        <div className="features-group">
          {features.slice(3, 6).map((feature) => (
            <FeatureButton
              key={feature._id}
              Icon={resolveIcon(feature.iconName)}
              label={feature.label}
              side="R"
              thisClicked={idClicked === feature._id}
              setIdClicked={() => {
                setIdClicked(idClicked === feature._id ? null : feature._id);
              }}
            />
          ))}
        </div>
      </div>

      {/* <div className="globe-container">
        <Image src={Globe2} alt="Globe" />
      </div> */}

      <Divider></Divider>
    </div>
  );
});

export default Features;
