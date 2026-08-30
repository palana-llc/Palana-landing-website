import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HeadlineCarousel } from "./components/HeadlineCarousel";
import { SafetyGaps } from "./components/SafetyGaps";
import { WhyPalana } from "./components/WhyPalana";
import { Growth } from "./components/Growth";
import { News, type NewsItem } from "./components/News";
import { Dispatch } from "./components/Dispatch";
import { Footer } from "./components/Footer";
import { sanityFetch } from "../sanity/lib/live";

import WhatsPalana from "./components/WhatsPalana";

export default async function Home() {
  const query =
    '*[_type == "news"] | order(date desc)[0...2]{_id, title, description, slug, date, category, "imageUrl": image.asset->url}';

  const latestNews = await sanityFetch<NewsItem[]>(query);

  return (
    <>
      <Navbar />
      <Hero />
      <HeadlineCarousel />
      <WhatsPalana />
      <WhyPalana />
      <Dispatch />
      <SafetyGaps />
      <Growth />
      <News items={latestNews} />
      <Footer />
    </>
  );
}
