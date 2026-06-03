const jumpLink = document.querySelector('a[href="#content"');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function searchPageJumpLinkFix() {
  jumpLink.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = e.target.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      // Make sure the element can accept focus (even if it's a <div> or <main>) since we're forcing focus via JS
      if (!targetEl.hasAttribute('tabindex')) {
        targetEl.setAttribute('tabindex', '-1');
      }
    
      // Move focus to the element so VoiceOver/keyboard users land there
      targetEl.focus(); // Always .focus() prior to .scrollIntoView()!
      // Ensure we respect (prefers-reduced-motion: reduce) by explicitly checking when using scrollIntoView()
      targetEl.scrollIntoView({
        behavior: prefersReducedMotion.matches ? 'instant' : 'smooth'
      });
    }
  });
}

export default searchPageJumpLinkFix;
