// Custom Vanilla JS to highlight the user's current location in the navigation bar and the sub-nav navigation bar
function setActive(thisLink, linkText) {
  let thisAnchor = thisLink.querySelector('a');

  thisLink.classList.add('active');
  thisAnchor.insertAdjacentHTML('beforeend', ' <span class="sr-only">(current)</span>');
}

function highlightSubNav(pathname) {
  const subNavItems = document.querySelectorAll('.js-sub-nav-item');

  for ( let link of subNavItems) {
    const anchor = link.querySelector('a');
    const href = anchor.getAttribute('href').replace(/\.\.\//g, '');
    const linkText = anchor.textContent;
    const urlMatchesLink = pathname.indexOf(href) !== -1;

    urlMatchesLink ?
      setActive(link, linkText)
    : null;
  }
}

function highlightNav() {
  const pathname = window.location.pathname;
  const locationIsContactHash = window.location.hash === '#contact';
  const locationIsHome = window.location.pathname === '/';

  document.getElementById('subNavNav') ?
    highlightSubNav(pathname)
  : null;

  const navigationItems = document.querySelectorAll('.js-nav-item');

  for ( let link of navigationItems ) {
    const linkAnchor = link.querySelector('a');
    const linkHrefValue = linkAnchor.getAttribute('href').replace(/\.\.\//g, '');
    const linkTextValue = linkAnchor.textContent;
    const linkIsHome = linkTextValue.toLowerCase() === 'home';
    const urlMatchesLink = pathname.indexOf(linkHrefValue) !== -1;

    if ( locationIsHome || locationIsContactHash ) {
      linkIsHome ? setActive(link, linkTextValue) : null;
    } else {
      urlMatchesLink && !linkIsHome ? setActive(link, linkTextValue) : null;
    }
  }
}
//
//  USEAGE:
//
//    document.addEventListener('DOMContentLoaded', function() {
//      highlightNav();
//    });
//
export default highlightNav;
