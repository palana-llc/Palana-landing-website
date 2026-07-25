import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import GetStartedContent from './components/GetStartedContent';
import { client } from '@/sanity/lib/client';
import type { TutorialStep, LaptopFeature } from './types';

import './home.css';

const studentStepsQuery = `
  *[_type == "studentTutorialStep"] | order(order asc) {
    _id,
    title,
    body,
    order,
    "phoneScreenImageUrl": phoneScreenImage.asset->url
  }
`;

const schoolStepsQuery = `
  *[_type == "schoolTutorialStep"] | order(order asc) {
    _id,
    title,
    body,
    order,
    "phoneScreenImageUrl": phoneScreenImage.asset->url
  }
`;

const featuresQuery = `
  *[_type == "laptopFeature"] | order(order asc) {
    _id,
    label,
    iconName,
    order,
    "laptopScreenImageUrl": laptopScreenImage.asset->url
  }
`;


export default async function Getstarted() {
  const [studentsSteps, schoolsSteps, features] = await Promise.all([
    client.fetch<TutorialStep[]>(studentStepsQuery),
    client.fetch<TutorialStep[]>(schoolStepsQuery),
    client.fetch<LaptopFeature[]>(featuresQuery),
  ]);

  return (
    <>
      <Navbar />
      <div className="bg">
        <GetStartedContent studentsSteps={studentsSteps} schoolsSteps={schoolsSteps} features={features} />
      </div>
      <Footer />
    </>
  );
}
