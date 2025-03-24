import React from 'react';
import css from './Footer.module.css';

const SocialLinks = () => {
  const socialMediaLinks = [
    {
      href: "https://www.facebook.com",
      label: "Facebook",
      iconId: "icon-facebook",
    },
    {
      href: "https://www.instagram.com",
      label: "Instagram",
      iconId: "icon-instagram",
    },
    {
      href: "https://www.youtube.com",
      label: "YouTube",
      iconId: "icon-youtube",
    },
  ];

  return (
    <ul className={css.socialLinks}>
      {socialMediaLinks.map(({ href, label, iconId }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <svg className={css.icon}>
              <use href={`/src/images/icons.svg#${iconId}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
