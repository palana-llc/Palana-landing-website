import "../css/headline-carousel.css";

const Item = () => (
  <span className="headline-carousel-item">
    <span>Palana is dedicated to simplifying campus safety for all schools!</span>
    <img
      src="/blue-logo-vector.svg"
      alt="Palana"
      className="headline-carousel-logo"
    />
  </span>
);

export const HeadlineCarousel = () => (
  <span className="headline-carousel">
    <span className="headline-carousel-track">
      <Item />
      <Item />
      <Item />
      <Item />
    </span>
  </span>
);
