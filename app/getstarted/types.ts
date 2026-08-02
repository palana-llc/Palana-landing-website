export type TutorialStep = {
  _id: string;
  title: string;
  body: string;
  order: number;
  phoneScreenImageUrl: string | null;
  phoneScreenVideoUrl: string | null;
};

export type Feature = {
  _id: string;
  label: string;
  iconName: string;
  order: number;
  phoneScreenImageUrl: string | null;
  phoneScreenVideoUrl: string | null;
};

export type LaptopFeature = {
  _id: string;
  label: string;
  iconName: string;
  order: number;
  laptopScreenImageUrl: string | null;
  laptopScreenVideoUrl: string | null;
};
