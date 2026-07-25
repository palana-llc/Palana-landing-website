import React from "react";
import "../css/news.css";
import { ArrowRight } from "lucide-react";

import { NewsCard, type NewsCategory } from "./NewsCard";

export type NewsItem = {
  _id: string;
  title: string;
  description: string;
  slug?: string;
  date?: string;
  imageUrl?: string;
  category?: NewsCategory | null;
};

type NewsProps = {
  items: NewsItem[];
};

export function News({ items }: NewsProps): React.ReactElement {
  const hasItems = items && items.length > 0;

  return (
    <section id="news" className="news-section">
      <div className="news-side-stack" aria-hidden="true">
        <div className="news-side-box" />
        <div className="news-side-box" />
        <div className="news-side-box" />
        <div className="news-side-box" />
      </div>
      <div className="news-container">
        <div className="news-header">
          <h2 className="news-title">The Latest From Palana</h2>
          <p className="news-subtitle">
            Stay updated with the latest news and updates from Palana!
            To see more updates from Palana, check out the <a href="/about/news" className="news-subtitle-link">What&apos;s New page
              <ArrowRight className="news-subtitle-link-arrow" aria-hidden />
            </a>
          </p>
        </div>
        {hasItems ? (
          <div className="news-list">
            {items.map((item) => (
              <NewsCard
                key={item._id}
                title={item.title}
                description={item.description}
                href={
                  item.slug
                    ? `/about/news/${encodeURIComponent(item.slug)}`
                    : undefined
                }
                date={item.date}
                imageUrl={item.imageUrl}
                category={item.category}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No news items yet. Check back soon.</p>
        )}
      </div>
    </section>
  );
}