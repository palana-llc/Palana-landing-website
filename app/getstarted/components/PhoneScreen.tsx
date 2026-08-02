import './PhoneScreen.css';
import Image from 'next/image';
import PhoneFrame from '../images/PhoneFrame.png';
import LoadingScreen from '../images/LoadingScreen.png';
import screenGif from './screen-gif.gif';

type Props = {
  src: string | null;
  videoSrc?: string | null;
};

export default function PhoneScreen({ src, videoSrc }: Props) {
  return (
    <div className="phone-container">
      {videoSrc ? (
        <video
          src={videoSrc}
          className="phone-img"
          width={301}
          height={600}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Image
          src={src ?? screenGif}
          alt="Phone screen"
          className="phone-img"
          width={301}
          height={600}
          unoptimized={src !== null}
        />
      )}
      <Image
        src={PhoneFrame}
        alt="Phone Frame"
        className="phone-frame"
      />
    </div>
  );
}
