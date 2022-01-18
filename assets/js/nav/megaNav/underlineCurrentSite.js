const  NAV_GLOBAL_BOTTOM_NAV_ITEMS = document.getElementById('navGlobalBottom'); // ID from the HTML

function underlineCurrentSite() {
  const NAV_ITEMS = NAV_GLOBAL_BOTTOM_NAV_ITEMS.querySelectorAll('li');  // Navigation HTML structure uses <ul><li>...</li><li>...</li></ul> which is common markup for a Bootrap's nav (from their documentation)
  const url = window.location.pathname.replace(/(^\/|\/$)/g, '');

  for (let i = 0, len = NAV_ITEMS.length; i < len; i++) {
    let NAV_CATEGORIES = NAV_ITEMS[i].dataset.nav; // Comes from data-set attributes built into the HTML

    if ( url.search(NAV_CATEGORIES) !== -1 ) {
      let NAV_LINK = NAV_ITEMS[i].querySelector('a');

      return NAV_LINK.classList.add('header-global__nav-bottom--underlined'); // return breaks the loop and this is the class to underline stuff with
    }
  }
}
export default underlineCurrentSite;
