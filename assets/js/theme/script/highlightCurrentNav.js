function setActive(thisLink, linkText) {
  let thisAnchor = thisLink.querySelector('a');
  thisLink.classList.add('active');
  thisAnchor.insertAdjacentHTML('beforeend', ' <span class="sr-only">(current)</span>');
}

function highlightNav() {
  const host = window.location.host + '/';
  const url = window.location.href.replace(/(^\w+:|^)\/\//, '');
  const urlIsIndex = url === host || url === host + '#contact' ;
  const navigationItems = document.querySelectorAll('.js-nav-item');

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
