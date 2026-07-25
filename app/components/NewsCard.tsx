"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { NewsItem } from "./News";
import { Pagination } from "./Pagination";

export type NewsCategory = "updates" | "partnerships" | "features";

export const NEWS_CATEGORIES: NewsCategory[] = [
  "updates",
  "partnerships",
  "features",
];

export const CATEGORY_LABELS: Record<NewsCategory, string> = {
  updates: "Updates",
  partnerships: "Partnerships",
  features: "Features",
};

function isNewsCategory(value: string | null | undefined): value is NewsCategory {
  return (
    value === "updates" ||
    value === "partnerships" ||
    value === "features"
  );
}

export function NewsTag({
  category,
  className = "",
}: {
  category?: NewsCategory | string | null;
  className?: string;
}): React.ReactElement | null {
  if (!isNewsCategory(category)) return null;
  return (
    <span
      className={`tape-silhouette tape-silhouette--tag news-tag-tape news-tag-tape--${category} ${className}`.trim()}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

type NewsCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  href?: string;
  date?: string;
  category?: NewsCategory | null;
};

const isExternalHref = (href: string): boolean =>
  /^https?:\/\//i.test(href);

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

export const NewsCard = ({
  title,
  description,
  imageUrl,
  href,
  date,
  category,
}: NewsCardProps): React.ReactElement => {
  const content = (
    <article className="news-card">
      {imageUrl && (
        <div className="news-card-image-wrapper">
          <div className="news-card-image-inner">
            <img
              src={imageUrl}
              alt={title}
              className="news-card-image"
            />
          </div>
        </div>
      )}
      <div className="news-card-body">
        <div>
          {(category || date) && (
            <div className="news-card-meta">
              <NewsTag category={category} />
              {date && (
                <p className="news-card-date">
                  <CalendarDays className="news-card-date-icon" aria-hidden />
                  {formatDateWithOrdinal(date)}
                </p>
              )}
            </div>
          )}
          <h3 className="news-card-title">
            {title}
          </h3>
          <p className="news-card-description">
            {description}
          </p>
        </div>
        {href && (
          <div className="news-card-footer">
            <span className="news-card-button">
              Read more
              <span aria-hidden className="news-card-button-arrow">
                →
              </span>
            </span>
          </div>
        )}
      </div>
    </article>
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

type SortOrder = "newest" | "oldest";

function newsItemTime(item: NewsItem): number {
  if (!item.date) return 0;
  const t = new Date(item.date).getTime();
  return Number.isNaN(t) ? 0 : t;
}

const NEWS_PAGE_SIZE = 4;

type NewsListingWithFiltersProps = {
  items: NewsItem[];
};

export function NewsListingWithFilters({
  items,
}: NewsListingWithFiltersProps): React.ReactElement {
  const [page, setPage] = useState(1);
  const [categoryOn, setCategoryOn] = useState<Record<NewsCategory, boolean>>(
    () =>
      NEWS_CATEGORIES.reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<NewsCategory, boolean>,
      ),
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const allCategoriesSelected = NEWS_CATEGORIES.every((c) => categoryOn[c]);

  const filteredAndSorted = useMemo(() => {
    const visible = new Set(
      NEWS_CATEGORIES.filter((c) => categoryOn[c]),
    );
    const filteringActive =
      visible.size > 0 && visible.size < NEWS_CATEGORIES.length;

    let list = items.filter((item) => {
      if (!filteringActive) return true;
      if (!item.category) return false;
      return visible.has(item.category);
    });

    list = [...list].sort((a, b) => {
      const diff = newsItemTime(b) - newsItemTime(a);
      return sortOrder === "newest" ? diff : -diff;
    });

    return list;
  }, [items, categoryOn, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSorted.length / NEWS_PAGE_SIZE),
  );

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * NEWS_PAGE_SIZE;
    return filteredAndSorted.slice(start, start + NEWS_PAGE_SIZE);
  }, [filteredAndSorted, page]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const toggleCategory = (c: NewsCategory) => {
    setCategoryOn((prev) => ({ ...prev, [c]: !prev[c] }));
    setPage(1);
  };

  const selectAllCategories = () => {
    setCategoryOn(
      NEWS_CATEGORIES.reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<NewsCategory, boolean>,
      ),
    );
    setPage(1);
  };

  return (
    <div className="news-page-with-filters">
      <div className="news-page-with-filters__grid">
        <div className="news-page-with-filters__main">
          {filteredAndSorted.length > 0 ? (
            <div className="news-list news-list--page">
              {paginatedItems.map((item) => (
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
            <p className="news-page-empty-filters">
              No posts match these filters. Try selecting more tags.
            </p>
          )}
        </div>

        <aside
          className="news-page-filters"
          aria-label="Filter and sort news posts"
        >
          <div className="news-page-filters__stack">
            <section
              className="news-page-filters__modal"
              aria-labelledby="news-filter-tags-title"
            >
              <div className="news-page-filters__tags-header">
                <h2
                  id="news-filter-tags-title"
                  className="news-page-filters__heading"
                >
                  Tags
                </h2>
                {!allCategoriesSelected && (
                  <button
                    type="button"
                    className="news-page-filters__reset news-page-filters__reset--inline"
                    onClick={selectAllCategories}
                  >
                    Show all tags
                  </button>
                )}
              </div>
              <fieldset className="news-page-filters__fieldset">
                <legend className="news-page-filters__legend visually-hidden">
                  Filter by tag
                </legend>
                <ul className="news-page-filters__list">
                  {NEWS_CATEGORIES.map((c) => (
                    <li key={c}>
                      <label className="news-page-filters__checkbox-label">
                        <input
                          type="checkbox"
                          className="news-page-filters__checkbox"
                          checked={categoryOn[c]}
                          onChange={() => toggleCategory(c)}
                        />
                        <span
                          className={`tape-silhouette tape-silhouette--tag news-tag-tape news-tag-tape--${c}`}
                        >
                          {CATEGORY_LABELS[c]}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            </section>

            <section
              className="news-page-filters__modal"
              aria-labelledby="news-filter-sort-title"
            >
              <h2
                id="news-filter-sort-title"
                className="news-page-filters__heading"
              >
                Sort by date
              </h2>
              <fieldset className="news-page-filters__fieldset">
                <legend className="news-page-filters__legend visually-hidden">
                  Sort order
                </legend>
                <div className="news-page-filters__radios">
                  <label className="news-page-filters__radio-label">
                    <input
                      type="radio"
                      name="news-sort"
                      className="news-page-filters__radio"
                      checked={sortOrder === "newest"}
                      onChange={() => {
                        setSortOrder("newest");
                        setPage(1);
                      }}
                    />
                    Newest first
                  </label>
                  <label className="news-page-filters__radio-label">
                    <input
                      type="radio"
                      name="news-sort"
                      className="news-page-filters__radio"
                      checked={sortOrder === "oldest"}
                      onChange={() => {
                        setSortOrder("oldest");
                        setPage(1);
                      }}
                    />
                    Oldest first
                  </label>
                </div>
              </fieldset>
            </section>
          </div>
        </aside>

        {filteredAndSorted.length > 0 && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="pagination--full"
          />
        )}
      </div>
    </div>
  );
}
