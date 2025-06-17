const navList = document.querySelectorAll('.js-nav-item'); // local nav
const subNavList = document.querySelectorAll('.js-sub-nav-item'); // sub nav

const addActiveClass = li => li.classList.add('active');
const addAriaCurrent = (a, val) => a.setAttribute('aria-current', val);

function checkForMatchingNav(nodeList, isSubNav) {
  nodeList.forEach(li => {
    const linkPath = li.querySelector('a').getAttribute('href').replace(/.*(\/[^\/]+\/?)$/, `$1`);

    if (linkPath !== '/#contact' && window.location.pathname.includes(linkPath)) {
      const ariaCurrentValue = (isSubNav === true) ? 'page' : 'true';

      addActiveClass(li);
      addAriaCurrent(li.querySelector('a'), ariaCurrentValue);
    }
  });
}

function highlightNavItems() {
  checkForMatchingNav(navList, false);
  if (document.querySelector('.js-sub-nav-item')) {
    checkForMatchingNav(subNavList, true);
  }
}

export default highlightNavItems;
