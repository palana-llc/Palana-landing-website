"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

type DotEntry = number | "ellipsis";

export function buildDotEntries(current: number, total: number): DotEntry[] {
  if (total <= 1) {
    return [1];
  }
  if (total <= 11) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const show = new Set<number>();
  show.add(1);
  show.add(total);
  for (let p = 1; p <= Math.min(2, total); p += 1) {
    show.add(p);
  }
  for (let p = Math.max(1, total - 1); p <= total; p += 1) {
    show.add(p);
  }
  for (let d = -1; d <= 1; d += 1) {
    const p = current + d;
    if (p >= 1 && p <= total) {
      show.add(p);
    }
  }

  const sorted = [...show].sort((a, b) => a - b);
  const out: DotEntry[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (prev > 0 && n - prev > 1) {
      out.push("ellipsis");
    }
    out.push(n);
    prev = n;
  }
  return out;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps): React.ReactElement | null {
  if (totalPages <= 1) {
    return null;
  }

  const dots = buildDotEntries(page, totalPages);

  return (
    <nav
      className={`pagination ${className}`.trim()}
      aria-label="Pagination"
    >
      <div className="pagination__row">
        <button
          type="button"
          className="pagination__icon-btn pagination__icon-btn--edge"
          aria-label="Go to first page"
          disabled={page <= 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft className="pagination__svg" aria-hidden />
        </button>
        <button
          type="button"
          className="pagination__icon-btn pagination__icon-btn--step"
          aria-label="Go to previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeft className="pagination__svg" aria-hidden />
        </button>

        <ul className="pagination__dots" role="list">
          {dots.map((entry, i) =>
            entry === "ellipsis" ? (
              <li
                key={`ellipsis-${i}`}
                className="pagination__dots-item"
                aria-hidden
              >
                <span className="pagination__ellipsis">…</span>
              </li>
            ) : (
              <li key={entry} className="pagination__dots-item">
                <button
                  type="button"
                  className={
                    entry === page
                      ? "pagination__dot pagination__dot--active"
                      : "pagination__dot"
                  }
                  aria-label={`Go to page ${entry}`}
                  aria-current={entry === page ? "page" : undefined}
                  disabled={entry === page}
                  onClick={() => onPageChange(entry)}
                />
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          className="pagination__icon-btn pagination__icon-btn--step"
          aria-label="Go to next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          <ChevronRight className="pagination__svg" aria-hidden />
        </button>
        <button
          type="button"
          className="pagination__icon-btn pagination__icon-btn--edge"
          aria-label="Go to last page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronsRight className="pagination__svg" aria-hidden />
        </button>
      </div>
      <p className="pagination__sr-only" aria-live="polite">
        Page {page} of {totalPages}
      </p>
    </nav>
  );
}
