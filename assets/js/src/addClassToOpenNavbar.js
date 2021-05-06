const NAVBAR_COLLAPSE_ID = 'headerGlobalNavbarContent';
const HEADER_GLOBAL = '.header-global';

function addClassToOpenNavbar() {
  if ( ! document.getElementById(NAVBAR_COLLAPSE_ID) )
    return;

  const collapse = document.getElementById(NAVBAR_COLLAPSE_ID);
  const header = document.querySelector(HEADER_GLOBAL);

  $(collapse).on('show.bs.collapse', (e) => {
    header.classList.add('header-global__open');
  });

  $(collapse).on('hide.bs.collapse', (e) => {
    header.classList.remove('header-global__open');
  });
}

export default addClassToOpenNavbar;