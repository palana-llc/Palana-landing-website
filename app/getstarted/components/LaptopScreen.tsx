import './LaptopScreen.css';
import Image from 'next/image';
import LaptopFrame from '../images/LaptopFrame.png';
import LoadingScreen from '../images/LoadingScreen.png';
import laptopGif from './laptopGif.gif';

type Props = {
  src: string | null;
  videoSrc?: string | null;
};

export default function LaptopScreen({ src, videoSrc }: Props) {
  return (
    <div className="laptop-container">
      {videoSrc ? (
        <video
          src={videoSrc}
          className="laptop-img"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Image
          src={src ?? laptopGif}
          alt="Laptop screen"
          className="laptop-img"
          width={301}
          height={600}
          unoptimized={src !== null}
        />
      )}
      <Image
        src={LaptopFrame}
        alt="Laptop Frame"
        className="laptop-frame"
      />
    </div>
  );
}
