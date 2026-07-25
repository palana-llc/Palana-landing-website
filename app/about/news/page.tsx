import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
// import { TapeHeader } from "@/app/components/TapeHeader";
import { NewsListingWithFilters } from "@/app/components/NewsCard";
import type { NewsItem } from "@/app/components/News";
import { sanityFetch } from "@/sanity/lib/live";

import "../../css/news.css";

export default async function NewsPage() {
  const query =
    '*[_type == "news"] | order(date desc){_id, title, description, slug, date, category, "imageUrl": image.asset->url}';
  const items = await sanityFetch<NewsItem[]>(query);
  const hasItems = items && items.length > 0;

  return (
    <>
      <Navbar />
      <main>
        <section className="mission-hero">
          <div className="mission-hero-inner">
            <div className="mission-title-wrapper">
              <h1 className="news-page-plain-title">
                What&apos;s New at Palana
              </h1>
            </div>
            <p className="news-article-subtitle">
              Check out the latest news and updates from Palana!
            </p>
          </div>
        </section>
        <section className="news-section news-section-plain" id="news-page-section">
          {hasItems ? (
            <NewsListingWithFilters items={items} />
          ) : (
            <div className="news-container">
              <p className="text-gray-500">No news items yet. Check back soon.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}