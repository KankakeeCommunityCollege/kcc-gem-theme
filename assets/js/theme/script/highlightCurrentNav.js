// Custom Vanilla JS to highlight the user's current location in the navigation bar and the sub-nav navigiation bar
function setActive(thisLink, linkText) {
  let thisAnchor = thisLink.querySelector('a');
  thisLink.classList.add('active');
  thisAnchor.insertAdjacentHTML('beforeend', ' <span class="sr-only">(current)</span>');
}

function highlightSubNav(url) {
  const subNavItems = document.querySelectorAll('.js-sub-nav-item');
  for ( let link of subNavItems) {
    const anchor = link.querySelector('a');
    const href = anchor.getAttribute('href').replace(/\.\.\//g, '');
    const linkText = anchor.textContent;
    const urlMatchesLink = url.indexOf(href) > -1;
    urlMatchesLink ?
      setActive(link, linkText)
    : null;
  }
}

function highlightNav() {
  const host = window.location.host + '/';
  const url = window.location.href.replace(/(^\w+:|^)\/\//, '');
  const urlIsIndex = url === host || url === host + '#contact' ;
  const navigationItems = document.querySelectorAll('.js-nav-item');
  document.getElementById('subNavNav') ?
    highlightSubNav(url)
  : null;

  for ( let link of navigationItems ) {
    const linkAnchor = link.querySelector('a');
    const linkHref = linkAnchor.getAttribute('href').replace(/\.\.\//g, '');
    const linkText = linkAnchor.textContent;
    const linkIsHome = linkText.toLowerCase() === 'home';
    const urlMatchesLink = url.indexOf(linkHref) > -1;

    if ( urlIsIndex ) {
      linkIsHome ? setActive(link, linkText) : null;
    } else {
      urlMatchesLink && !linkIsHome ? setActive(link, linkText) : null;
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
