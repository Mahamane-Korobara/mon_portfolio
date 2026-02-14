import React, { useEffect } from 'react';

export default function SEO({ profile }) {
  useEffect(() => {
    if (!profile) return;

    // Title
    document.title = `${profile.full_name} - ${profile.title} | Portfolio Professionnel`;

    // Meta description
    updateOrCreateMeta('name', 'description', 
      `${profile.bio} Portfolio de ${profile.full_name}, ${profile.title} basé à ${profile.location}. ${profile.years_experience} ans d'expérience, ${profile.projects_completed}+ projets réalisés.`
    );

    // Meta keywords
    updateOrCreateMeta('name', 'keywords',
      `développeur, ${profile.title}, portfolio, ${profile.location}, React, Node.js, développement web, freelance`
    );

    // Author
    updateOrCreateMeta('name', 'author', profile.full_name);

    // Open Graph
    updateOrCreateMeta('property', 'og:title', `${profile.full_name} - ${profile.title}`);
    updateOrCreateMeta('property', 'og:description', profile.bio);
    updateOrCreateMeta('property', 'og:type', 'website');
    updateOrCreateMeta('property', 'og:url', window.location.href);
    if (profile.avatar_url) {
      updateOrCreateMeta('property', 'og:image', profile.avatar_url);
    }
    updateOrCreateMeta('property', 'og:locale', 'fr_FR');

    // Twitter Card
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', `${profile.full_name} - ${profile.title}`);
    updateOrCreateMeta('name', 'twitter:description', profile.bio);
    if (profile.avatar_url) {
      updateOrCreateMeta('name', 'twitter:image', profile.avatar_url);
    }

    // Canonical URL
    updateOrCreateLink('canonical', window.location.href);

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": profile.full_name,
      "jobTitle": profile.title,
      "description": profile.bio,
      "image": profile.avatar_url,
      "email": profile.email,
      "telephone": profile.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": profile.location
      },
      "sameAs": [
        profile.github_url,
        profile.linkedin_url,
        profile.twitter_url
      ].filter(Boolean),
      "url": window.location.href,
      "alumniOf": "Développeur Full-Stack",
      "knowsAbout": ["Développement Web", "React", "Node.js", "JavaScript", "TypeScript"],
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      }
    };

    updateOrCreateScript('application/ld+json', JSON.stringify(structuredData));

  }, [profile]);

  return null;
}

// Helpers
function updateOrCreateMeta(attribute, key, content) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateOrCreateLink(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function updateOrCreateScript(type, content) {
  let element = document.querySelector(`script[type="${type}"]`);
  if (!element) {
    element = document.createElement('script');
    element.setAttribute('type', type);
    document.head.appendChild(element);
  }
  element.textContent = content;
}