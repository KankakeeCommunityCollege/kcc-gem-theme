const navList = document.querySelectorAll('.js-nav-item'); // local nav
const subNavList = document.querySelectorAll('.js-sub-nav-item'); // sub nav

const addActiveClass = li => li.classList.add('active');

function checkForMatchingNav(nodeList) {
  nodeList.forEach(li => {
    const linkPath = li.querySelector('a').getAttribute('href').replace(/.*(\/[^\/]+\/?)$/, `$1`);

    if (linkPath !== '/#contact' && window.location.pathname.includes(linkPath)) {
      addActiveClass(li);
    }
  });
}

function highlightNavItems() {
  checkForMatchingNav(navList);
  if (document.querySelector('.js-sub-nav-item')) {
    checkForMatchingNav(subNavList);
  }
}

export default highlightNavItems;
