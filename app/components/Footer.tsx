import React from 'react';
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  type LucideIcon,
} from 'lucide-react';

type NavLink = {
  title: string;
  href: string;
};

type SocialLink = {
  icon: LucideIcon;
  href: string;
  label: string;
};

const renderNavLink = (link: NavLink, index: number): React.ReactElement => (
  <li key={index}>
    <a href={link.href} className="footer-link">
      {link.title}
    </a>
  </li>
);

const renderSocialLink = (social: SocialLink, index: number): React.ReactElement => (
  <a
    key={index}
    href={social.href}
    aria-label={social.label}
    className="footer-social-link"
    target="_blank"
    rel="noreferrer"
  >
    {React.createElement(social.icon, { className: "footer-social-icon" })}
  </a>
);

export const Footer = (): React.ReactElement => {
  const impactLinks: NavLink[] = [
    { title: 'Key Statistics', href: '#impact' },
    { title: 'Student Spotlight', href: '#impact-stories' },
    { title: 'University Spotlight', href: '#impact-stats' },
  ];

  const aboutLinks: NavLink[] = [
    { title: "What\'s New", href: '/about/news' },
    { title: "Palana\'s Mission", href: '/about' },
    { title: "Palana\'s Team", href: 'about/team' },
    { title: 'Features', href: '/getstarted' },
  ];

  const contactLinks: NavLink[] = [
    { title: 'Get in Touch', href: '/contact' },
    { title: 'Research Program', href: '/contact/getinvolved' },
    { title: 'Join Palana', href: '/contact/getinvolved#positions' },
  ];

  const getStartedLinks: NavLink[] = [
    { title: 'For Students', href: '#signup' },
    { title: 'For Drivers', href: '#ios' },
    { title: 'FAQs', href: '#signin' },
  ];

  const socialLinks: SocialLink[] = [
    // { icon: Twitter, href: '#', label: 'Twitter' },
    // { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/official_palana/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/palana2026/', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src="/white-logo-vector.svg" alt="" className="footer-logo" />
              <span className="footer-brand-name">Palana</span>
            </div>
            <p className="footer-tagline">
              Safer for students, simpler for schools
            </p>
            <div className="footer-socials">
              {socialLinks.map(renderSocialLink)}
            </div>
          </div>

          <div>
            <h3 className="footer-section-title">Impact</h3>
            <ul className="footer-links">
              {impactLinks.map(renderNavLink)}
            </ul>
          </div>

          <div>
            <h3 className="footer-section-title">About Us</h3>
            <ul className="footer-links">
              {aboutLinks.map(renderNavLink)}
            </ul>
          </div>

          <div>
            <h3 className="footer-section-title">Contact Us</h3>
            <ul className="footer-links">
              {contactLinks.map(renderNavLink)}
            </ul>
          </div>

          <div>
            <h3 className="footer-section-title">Get Started</h3>
            <ul className="footer-links">
              {getStartedLinks.map(renderNavLink)}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Palana, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
