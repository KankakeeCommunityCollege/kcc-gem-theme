/**
 * Custom JS module to decorate external/new-tab links:
 *  - Adds screen reader hints to inform users of new tab/external destinations
 *  - Adds the launch/external icon for a visual hint.
 *  - Runs automatically so that non-technical editors (and devs) don't need to worry
 *    about marking up links and link accessibility/best practices.
 */
const currentHost = window.location.hostname.toLowerCase();
// Define hostnames/domains that should always be treated as internal
const internalDomains = [
  'kcc.edu',
  'jotform.com',
  'libcal.com',    // Needed for library libcal links
  'libguides.com', // Needed for library libguide links
  'cloudvent.net', // Ensure the CloudCannon previews look the same as the live website
  'localhost',     // Ensure local dev look the same as the live website
  '127.0.0.1'      // Ensure local dev look the same as the live website
];

function accessibleExternalLinks() {
  document.querySelectorAll('main a').forEach(link => {
  if (!link.hostname) return;

  const linkHost = link.hostname.toLowerCase();

  // A link is internal if it matches our institutional domain OR the current dev/preview host
  const isInternal = internalDomains.some(domain => 
    linkHost === domain || linkHost.endsWith('.' + domain)
  ) || linkHost === currentHost;

  const isExternal = !isInternal;
  const isNewTab = link.target === '_blank';

  if (!isExternal && !isNewTab) return;

  // Immutable assignment via chained ternary operator
  const srMessage = (isExternal && isNewTab) ? ' (external site, opens in new tab)'
    : isExternal ? ' (external link)'
    : isNewTab ? ' (opens in new tab)'
    : '';

  // Automatically apply visual icon helper class for external links
  if (isExternal) {
    link.classList.add('links__external');
  }

  // Inject Bootstrap 5 accessible text if not already present
  if (srMessage && !link.querySelector('.visually-hidden')) {
    const span = document.createElement('span');
    span.className = 'visually-hidden';
    span.textContent = srMessage;
    link.appendChild(span);
  }
});
}

export default accessibleExternalLinks;
