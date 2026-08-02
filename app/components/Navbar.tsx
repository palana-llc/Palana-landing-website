'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight, CornerDownRight } from 'lucide-react';
import { TapeHeader } from '@/app/components/TapeHeader';

type DropdownLink = {
  title: string;
  href: string;
  description?: string;
  bold?: boolean;
  boxed?: 'student' | 'university' | 'purple';
  indent?: boolean;
};

type DropdownId = 'impact' | 'about' | 'contact' | 'getstarted';

const impactLinks: DropdownLink[] = [
  { title: 'Key Statistics', href: '/impact', bold: true },
];

const IMPACT_NAV_SAFETY_QUESTION: string =
  'How safe do you feel walking alone at night near campus?';

const IMPACT_SAFETY_FORM_HREF: string = '/contact';

type ImpactNavSurveyRow = { id: string; label: string; pct: number };

const IMPACT_NAV_SAFETY_ROWS: ImpactNavSurveyRow[] = [
  { id: 'very-unsafe', label: 'Very unsafe', pct: 14.3 },
  { id: 'somewhat-unsafe', label: 'Somewhat unsafe', pct: 49.2 },
  { id: 'neutral', label: 'Neutral', pct: 20.6 },
  { id: 'somewhat-safe', label: 'Somewhat safe', pct: 14.3 },
  {
    id: 'very-safe',
    label: 'Very safe',
    pct: Math.round((100 - (14.3 + 49.2 + 20.6 + 14.3)) * 10) / 10,
  },
];

const IMPACT_NAV_PIE_COLORS: Record<string, string> = {
  'very-unsafe': '#6366f1',
  'somewhat-unsafe': '#3b82f6',
  neutral: '#fbbf24',
  'somewhat-safe': '#ec4899',
  'very-safe': '#a855f7',
};

const IMPACT_NAV_PIE_SLICES: { id: string; d: string; fill: string }[] = (() => {
  const cx = 50;
  const cy = 50;
  const r = 42;
  let cum = 0;
  return IMPACT_NAV_SAFETY_ROWS.map((row) => {
    const start = (cum / 100) * 2 * Math.PI - Math.PI / 2;
    cum += row.pct;
    const end = (cum / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = row.pct > 50 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { id: row.id, d, fill: IMPACT_NAV_PIE_COLORS[row.id] ?? '#64748b' };
  });
})();

const impactNavLegendRow = (row: ImpactNavSurveyRow): React.ReactElement => (
  <li key={row.id} className={`nav-dropdown-impact-legend-row nav-dropdown-impact-legend-row--${row.id}`}>
    <span className="nav-dropdown-impact-legend-swatch" aria-hidden />
    <span className="nav-dropdown-impact-legend-label">{row.label}</span>
    <span className="nav-dropdown-impact-legend-pct">{row.pct}%</span>
  </li>
);

const SOFTWARE_FAQ_HEADING: string = 'Frequently Asked Questions:';

const aboutLinks: DropdownLink[] = [
  { title: 'What\'s New', href: '/about/news', bold: true },
  { title: 'Palana\'s Mission', href: '/about', bold: true },
  { title: 'Palana\'s Team', href: '/about/team', bold: true },
];

const contactLinks: DropdownLink[] = [
  { title: 'Get in Touch', href: '/contact', bold: true },
  { title: 'Get Involved', href: '/contact#support', bold: true, boxed: 'purple' },
  { title: 'Palana\'s Research Program', href: '/contact/getinvolved', indent: true },
  { title: 'Open Positions', href: '/contact/getinvolved#positions', indent: true },
];

const contactMobileLinks: DropdownLink[] = contactLinks.filter((link) => !link.indent);

type ProductColumnHeadingStyle = 'student' | 'university' | 'dispatcher';

const PRODUCT_COLUMN_TAPE: Record<ProductColumnHeadingStyle, { tapeColor: string; textColor: string }> = {
  student: { tapeColor: '#AFE6A6', textColor: '#3C578D' },
  university: { tapeColor: '#94D2E6', textColor: '#3C578D' },
  dispatcher: { tapeColor: '#F49E4C', textColor: '#3C578D' },
};

type GetStartedColumn = {
  heading: string;
  headingStyle?: ProductColumnHeadingStyle;
  links: DropdownLink[];
};

const getStartedColumns: GetStartedColumn[] = [
  {
    heading: 'For Students',
    headingStyle: 'student',
    links: [
      { title: 'Secure sign-in', href: '/getstarted', indent: true },
      { title: 'Requesting a ride', href: '/getstarted', indent: true },
      { title: 'Secure driver messaging', href: '/getstarted', indent: true },
      { title: 'Live driver tracking', href: '/getstarted', indent: true },
    ],
  },
  {
    heading: 'For Drivers',
    headingStyle: 'university',
    links: [
      { title: 'Ride request acceptance', href: '/getstarted', indent: true },
      { title: 'In-app Routing', href: '/getstarted', indent: true },
      { title: 'Automatic student ride updates', href: '/getstarted', indent: true },
      { title: 'Ride requests, routing, & hand-offs', href: '/getstarted', indent: true },
    ],
  },
  {
    heading: 'For Dispatchers',
    headingStyle: 'dispatcher',
    links: [
      { title: 'Student ride information entry', href: '/getstarted', indent: true },
      { title: 'Quick location lookup', href: '/getstarted', indent: true },
      { title: 'Cancelling a ride', href: '/getstarted', indent: true },
    ],
  },
  {
    heading: SOFTWARE_FAQ_HEADING,
    links: [
      { title: 'How do I download Palana?', href: '/getstarted', indent: true },
      { title: 'Is my school partnered with Palana?', href: '/contact', indent: true },
      { title: 'Is Palana free?', href: '/getstarted', indent: true },
      { title: 'What do I do if I encounter a problem?', href: '/getstarted', indent: true },
    ],
  },
];

const softwareMobileLinks: DropdownLink[] = getStartedColumns.map((col) => ({
  title: col.heading,
  href: '/getstarted',
  bold: true,
}));

type BoxedKind = 'student' | 'university' | 'purple';

const BOXED_TAPE: Record<BoxedKind, { tapeColor: string; textColor: string }> = {
  student: { tapeColor: '#90BE88', textColor: '#ffffff' },
  university: { tapeColor: '#208AAE', textColor: '#ffffff' },
  purple: { tapeColor: '#F49E4C', textColor: '#3C578D' },
};

const DesktopDropdownLink = (props: { link: DropdownLink; index: number }): React.ReactElement => {
  const link = props.link;
  const baseClasses = [
    'nav-dropdown-link',
    link.bold && 'nav-dropdown-link-bold',
    link.indent && 'nav-dropdown-link-with-arrow',
    link.boxed && 'nav-dropdown-link--tape',
  ]
    .filter(Boolean)
    .join(' ');

  if (link.boxed) {
    const tape = BOXED_TAPE[link.boxed];
    return (
      <a href={link.href} className={baseClasses}>
        {link.indent && (
          <CornerDownRight className="nav-dropdown-link-arrow-icon" />
        )}
        <TapeHeader
          as="span"
          size="medium"
          angle="straight"
          edge="subtle"
          tapeColor={tape.tapeColor}
          textColor={tape.textColor}
          className={`nav-dropdown-link-tape nav-dropdown-link-tape--${link.boxed}`}
        >
          <span className="nav-dropdown-link-title">{link.title}</span>
        </TapeHeader>
        {link.description != null && (
          <span className="nav-dropdown-link-desc">{link.description}</span>
        )}
      </a>
    );
  }

  return (
    <a href={link.href} className={baseClasses}>
      {link.indent && (
        <CornerDownRight className="nav-dropdown-link-arrow-icon" />
      )}
      <span className="nav-dropdown-link-title">{link.title}</span>
      {link.description != null && (
        <span className="nav-dropdown-link-desc">{link.description}</span>
      )}
    </a>
  );
};

const renderGetStartedGridColumn = (col: GetStartedColumn): React.ReactElement => {
  const inner = (
    <>
      <a href="/getstarted" className="nav-dropdown-column-heading-link">
        {col.headingStyle != null ? (
          <TapeHeader
            as="span"
            size="medium"
            angle="straight"
            edge="subtle"
            tapeColor={PRODUCT_COLUMN_TAPE[col.headingStyle].tapeColor}
            textColor={PRODUCT_COLUMN_TAPE[col.headingStyle].textColor}
            className="nav-dropdown-heading-tape"
          >
            {col.heading}
          </TapeHeader>
        ) : (
          <h3 className="nav-dropdown-heading">{col.heading}</h3>
        )}
      </a>
      <div className="nav-dropdown-links">
        {col.links.map((link, index) => (
          <DesktopDropdownLink key={`${col.heading}-${index}`} link={link} index={index} />
        ))}
      </div>
    </>
  );

  if (col.heading === 'For Students') {
    return (
      <div
        key={col.heading}
        className="nav-dropdown-column nav-dropdown-getstarted-cta-column"
      >
        {inner}
        <a href="/getstarted" className="nav-dropdown-faq-products-cta">
          Check out Palana&apos;s Software
          <ArrowRight className="nav-dropdown-cta-arrow" aria-hidden />
        </a>
      </div>
    );
  }

  if (col.heading === SOFTWARE_FAQ_HEADING) {
    return (
      <div key={col.heading} className="nav-dropdown-column nav-dropdown-column--faq">
        {inner}
      </div>
    );
  }

  return (
    <div key={col.heading} className="nav-dropdown-column">
      {inner}
    </div>
  );
};

const MobileNavLink = (props: {
  link: DropdownLink;
  onNavigate?: () => void;
}): React.ReactElement => (
  <a
    href={props.link.href}
    className={[
      'nav-mobile-link',
      props.link.bold && 'nav-mobile-link--bold',
      props.link.indent && 'nav-mobile-link--indent',
    ]
      .filter(Boolean)
      .join(' ')}
    onClick={props.onNavigate}
  >
    {props.link.title}
  </a>
);

type MobileNavSectionProps = {
  title: string;
  links: DropdownLink[];
  onNavigate?: () => void;
};

const MobileNavSection = (props: MobileNavSectionProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`nav-mobile-section ${isOpen ? 'nav-mobile-section--open' : ''}`}>
      <button
        type="button"
        className="nav-mobile-section-toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span>{props.title}</span>
        <ChevronDown className={`nav-mobile-chevron ${isOpen ? 'open' : ''}`} aria-hidden />
      </button>
      {isOpen && (
        <div className="nav-mobile-section-panel">
          {props.links.map((link) => (
            <MobileNavLink key={`${link.href}-${link.title}`} link={link} onNavigate={props.onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Navbar = (): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownId | null>(null);
  const dropdownRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) =>
      void (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && setActiveDropdown(null));
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav ref={dropdownRef} className="nav">
      <div className="nav-container">
        <div className="nav-row">
          <a href="/" aria-label="Palana home">
            <img src="/white-logo-vector.svg" alt="Palana" className="nav-logo" />
          </a>

          <div className="nav-desktop-end">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'impact' ? null : 'impact')}
              className="nav-nav-link"
            >
              Impact
              <ChevronDown className={`nav-chevron ${activeDropdown === 'impact' ? 'open' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              className="nav-nav-link"
            >
              About Us
              <ChevronDown className={`nav-chevron ${activeDropdown === 'about' ? 'open' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'contact' ? null : 'contact')}
              className="nav-nav-link"
            >
              Contact Us
              <ChevronDown className={`nav-chevron ${activeDropdown === 'contact' ? 'open' : ''}`} />
            </button>

            <div className="nav-get-started-wrap">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'getstarted' ? null : 'getstarted')}
                className="tape-header tape-silhouette tape-silhouette--subtle tape-header--medium tape-header--angle-right nav-get-started"
                aria-expanded={activeDropdown === 'getstarted'}
                aria-haspopup="true"
              >
                Software
              </button>
            </div>
          </div>

          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={(): void => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {activeDropdown && (
        <div className="nav-dropdown nav-dropdown-is-open">          
          <div className="nav-dropdown-inner">
            {activeDropdown === 'impact' && (
              <div className="nav-dropdown-grid">
                <div className="nav-dropdown-links">
                  {impactLinks.map((link, index) => <DesktopDropdownLink key={link.href} link={link} index={index} />)}
                </div>
                <div className="nav-dropdown-panel nav-dropdown-panel-impact">
                  <div className="nav-dropdown-impact-panel-row">
                    <section
                      className="nav-dropdown-impact-invite"
                      aria-labelledby="impact-share-safety-heading"
                    >
                      <h3
                        id="impact-share-safety-heading"
                        className="nav-dropdown-impact-invite-heading"
                      >
                        Want to share how safe you feel on your campus?
                      </h3>
                      <a
                        href={IMPACT_SAFETY_FORM_HREF}
                        className="nav-dropdown-cta-button nav-dropdown-impact-invite-cta"
                      >
                        Fill out our form!
                        <ArrowRight className="nav-dropdown-cta-arrow" />
                      </a>
                    </section>
                    <div className="nav-dropdown-impact-survey">
                      <p className="nav-dropdown-impact-survey-question">{IMPACT_NAV_SAFETY_QUESTION}</p>
                      <div className="nav-dropdown-impact-chart">
                        <svg
                          className="nav-dropdown-impact-pie-svg"
                          viewBox="0 0 100 100"
                          role="img"
                          aria-label="Survey results by category"
                        >
                          {IMPACT_NAV_PIE_SLICES.map((slice) => (
                            <path
                              key={slice.id}
                              d={slice.d}
                              fill={slice.fill}
                              stroke="#ffffff"
                              strokeWidth="0.7"
                            />
                          ))}
                        </svg>
                        <ul className="nav-dropdown-impact-legend">
                          {IMPACT_NAV_SAFETY_ROWS.map(impactNavLegendRow)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeDropdown === 'about' && (
              <div className="nav-dropdown-grid">
                <div className="nav-dropdown-links">
                  {aboutLinks.map((link, index) => <DesktopDropdownLink key={link.href} link={link} index={index} />)}
                </div>
                <div className="nav-dropdown-panel nav-dropdown-panel-about">
                  <div className="nav-speech-bubbles">
                    <TapeHeader
                      as="h3"
                      size="medium"
                      angle="left"
                      edge="subtle"
                      tapeColor="#F49E4C"
                      textColor="#3C578D"
                      className="nav-speech-bubbles-title-tape"
                    >
                      Why We Love Palana
                    </TapeHeader>
                    <div className="nav-speech-bubbles-quotes">
                      <div className="nav-speech-bubble nav-speech-bubble-main">
                        <p className="nav-speech-bubble-text">
                          “I take such pride and love to Palana because it turns something as simple as getting home into a focus on intentional safety.
                          It’s not just about a night ride; it’s about knowing someone thought deeply about accessibility and real student experiences. ”
                        </p>
                        <p className="nav-speech-bubble-attribution"><span className="nav-speech-bubble-name">Crystal Shen</span>, Founder</p>
                      </div>
                      <div className="nav-speech-bubble nav-speech-bubble-secondary">
                        <p className="nav-speech-bubble-text">
                          “I love that I am able to work with other dedicated individuals and contribute to the larger mission of ensuring all college students can rely on a secure and dependable app like Palana to make navigating on campus at night a stress-free process.”
                        </p>
                        <p className="nav-speech-bubble-attribution"><span className="nav-speech-bubble-name">Adwita Garg</span>, Mobile Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeDropdown === 'contact' && (
              <div className="nav-dropdown-grid">
                <div className="nav-dropdown-links">
                  {contactLinks.map((link, index) => <DesktopDropdownLink key={link.href} link={link} index={index} />)}
                </div>
                <div className="nav-dropdown-panel nav-dropdown-panel-contact">
                  <div className="nav-dropdown-contact-selectors">
                    <div className="nav-dropdown-contact-card nav-dropdown-contact-card--general">
                      <div className="nav-dropdown-contact-card-top">
                        <img
                          src="/General-Inquiries-Cutout.png"
                          alt=""
                          className="nav-dropdown-contact-card-cutout"
                        />
                        <h3 className="nav-dropdown-contact-card-title">
                          General
                          <br />
                          Inquiries
                        </h3>
                      </div>
                      <Link
                        href="/contact#general"
                        className="nav-dropdown-contact-card-btn"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Submit a Form
                      </Link>
                    </div>
                    <div className="nav-dropdown-contact-card nav-dropdown-contact-card--bug">
                      <div className="nav-dropdown-contact-card-top">
                        <img
                          src="/Report-Bug-Cutout.png"
                          alt=""
                          className="nav-dropdown-contact-card-cutout"
                        />
                        <h3 className="nav-dropdown-contact-card-title">
                          Report a
                          <br />
                          Bug
                        </h3>
                      </div>
                      <Link
                        href="/contact#bug"
                        className="nav-dropdown-contact-card-btn"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Submit a Form
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeDropdown === 'getstarted' && (
              <div className="nav-dropdown-grid nav-dropdown-grid-getstarted">
                {getStartedColumns.map(renderGetStartedGridColumn)}
              </div>
            )}
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="nav-mobile-menu">
          <div className="nav-mobile-menu-inner">
            <MobileNavSection
              title="Impact"
              links={impactLinks}
              onNavigate={() => setIsMenuOpen(false)}
            />
            <MobileNavSection
              title="About Us"
              links={aboutLinks}
              onNavigate={() => setIsMenuOpen(false)}
            />
            <MobileNavSection
              title="Contact Us"
              links={contactMobileLinks}
              onNavigate={() => setIsMenuOpen(false)}
            />
            <MobileNavSection
              title="Software"
              links={softwareMobileLinks}
              onNavigate={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};
