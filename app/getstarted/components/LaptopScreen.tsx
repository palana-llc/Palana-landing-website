import './LaptopScreen.css';
import Image from 'next/image';
import LaptopFrame from '../images/LaptopFrame.png';
import LoadingScreen from '../images/LoadingScreen.png';
import laptopGif from './laptopGif.gif';

type Props = {
  src: string | null;
};

export default function LaptopScreen({ src }: Props) {
  return (
    <div className="laptop-container">
      <Image
        src={src ?? laptopGif}
        alt="Phone screen"
        className="laptop-img"
        width={301}
        height={600}
        unoptimized={src !== null}
      />
      <Image
        src={LaptopFrame}
        alt="Phone Frame"
        className="laptop-frame"
      />
    </div>
  );
}
