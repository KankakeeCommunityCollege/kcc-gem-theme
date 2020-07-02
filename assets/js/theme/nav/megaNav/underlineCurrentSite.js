const CORE_SITE_PATHNAMES_ARRAY = ['academics', 'admissions', 'tuition-and-aid', 'student-resources', 'community', 'about'];
const NAV_GLOBAL_BOTTOM_ELEMENT = document.getElementById('navGlobalBottom');
const NAV_LINKS_NODELIST = NAV_GLOBAL_BOTTOM_ELEMENT.querySelectorAll('.header-global__nav-bottom--nav-link');

function findNavItem(path) {
  for (let i = 0, len = NAV_LINKS_NODELIST.length; i < len; i++) {
    let navText = NAV_LINKS_NODELIST[i].innerHTML.trim();
    let navTextAsURL = navText.replace(' ', '-').toLowerCase()
    let navTextNoAmp = navTextAsURL.replace('&amp;', 'and');

    if ( navTextNoAmp === path )
      NAV_LINKS_NODELIST[i].classList.add('header-global__nav-bottom--underlined');
  }
}

function compareUsersLocation(path, userPath) {
  const userPathNoSlashes = userPath.replace(/^\/|\/$/g, '');
  const noMatch = userPathNoSlashes != path;

  if (noMatch)
    return;

  findNavItem(userPathNoSlashes);
}

function loopOverPathnames(path) {
  for (let i = 0, len = CORE_SITE_PATHNAMES_ARRAY.length; i < len; i++) {
    //console.log(CORE_SITE_PATHNAMES_ARRAY[i]);
    compareUsersLocation(CORE_SITE_PATHNAMES_ARRAY[i], path);
  }
}

function underlineCurrentSite() {
  const location = window.location.pathname;
  const locationIsOrigin = location === '/'
  if ( locationIsOrigin )
    return;

  loopOverPathnames(location);
}
export default underlineCurrentSite;
