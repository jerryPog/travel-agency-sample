import { useEffect } from 'react';

export function ScrollObserver() {
  useEffect(() => {
    const selector = '.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-scale';
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Re-observe periodically or on DOM changes for dynamic elements
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll(selector);
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
