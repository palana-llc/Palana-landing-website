import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { NewsTag, type NewsCategory } from "@/app/components/NewsCard";
import { sanityFetch } from "@/sanity/lib/live";

import "../../../css/news.css";

type NewsArticle = {
  title: string;
  description: string;
  date: string;
  contents: string;
  imageUrl?: string;
  category?: NewsCategory | null;
  linkUrl?: string | null;
  linkLabel?: string | null;
};

const DEFAULT_LINK_LABEL = "Learn more";

const isExternalHref = (href: string): boolean =>
  /^https?:\/\//i.test(href);

type PageProps = {
  params: Promise<{ slug: string }>;
};

const formatDateWithOrdinal = (value: string): string => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;

  const day = d.getDate();
  const month = d.toLocaleString(undefined, { month: "long" });
  const year = d.getFullYear();

  const remainder = day % 10;
  const teenCheck = day % 100;
  let suffix = "th";

  if (teenCheck < 11 || teenCheck > 13) {
    if (remainder === 1) suffix = "st";
    else if (remainder === 2) suffix = "nd";
    else if (remainder === 3) suffix = "rd";
  }

  return `${month} ${day}${suffix}, ${year}`;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await sanityFetch<string[]>(
    '*[_type == "news" && defined(slug)].slug',
  );
  return (slugs ?? [])
    .filter((s): s is string => typeof s === "string" && s.length > 0)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await sanityFetch<NewsArticle | null>(
    '*[_type == "news" && slug == $slug][0]{ title, description, date, contents, category, linkUrl, linkLabel, "imageUrl": image.asset->url }',
    { slug },
  );

  if (!article) {
    return { title: "News" };
  }

  return {
    title: `${article.title} | Palana News`,
    description: article.description,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = await sanityFetch<NewsArticle | null>(
    '*[_type == "news" && slug == $slug][0]{ title, description, date, contents, category, linkUrl, linkLabel, "imageUrl": image.asset->url }',
    { slug },
  );

  if (!article) {
    notFound();
  }

  const relatedLink = article.linkUrl?.trim();
  const relatedLinkLabel =
    article.linkLabel?.trim() || DEFAULT_LINK_LABEL;

  return (
    <>
      <Navbar />
      <main>
        <section className="mission-hero">
          <div className="mission-hero-inner">
            <div className="news-article-hero-column">
              <div className="news-article-title-row">
                <Link
                  href="/about/news"
                  className="news-article-back-link"
                  aria-label="Back to all news"
                >
                  <span aria-hidden="true">&larr;</span> Back
                </Link>
                <h1 className="news-page-plain-title news-page-plain-title--article">
                  {article.title}
                </h1>
              </div>
            </div>
            <p className="news-article-subtitle">{article.description}</p>
          </div>
        </section>
        <article className="news-article">
          {(article.category || article.date) && (
            <div className="news-article-meta">
              <NewsTag category={article.category} />
              {article.date && (
                <p className="news-article-date">
                  <CalendarDays className="news-card-date-icon" aria-hidden />
                  {formatDateWithOrdinal(article.date)}
                </p>
              )}
            </div>
          )}
          {article.imageUrl && (
            <div className="news-article-image-wrap">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="news-article-image"
              />
            </div>
          )}
          <div className="news-article-content">{article.contents}</div>
          {relatedLink && (
            <footer className="news-article-footer">
              {isExternalHref(relatedLink) ? (
                <a
                  href={relatedLink}
                  target="_blank"
                  rel="noreferrer"
                  className="news-article-link"
                >
                  {relatedLinkLabel}
                  <span aria-hidden className="news-card-button-arrow">
                    →
                  </span>
                </a>
              ) : (
                <Link href={relatedLink} className="news-article-link">
                  {relatedLinkLabel}
                  <span aria-hidden className="news-card-button-arrow">
                    →
                  </span>
                </Link>
              )}
            </footer>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
