const NAVBAR_COLLAPSE_ID = 'headerGlobalNavbarContent';
const HEADER_GLOBAL = '.header-global';

function addClassToOpenNavbar() {
  if ( ! document.getElementById(NAVBAR_COLLAPSE_ID) )
    return;

  const collapse = document.getElementById(NAVBAR_COLLAPSE_ID);
  const header = document.querySelector(HEADER_GLOBAL);

  collapse.addEventListener('show.bs.collapse', _e => {
    header.classList.add('header-global__open');
  });

  collapse.addEventListener('hide.bs.collapse', _e => {
    header.classList.remove('header-global__open');
  });
}

export default addClassToOpenNavbar;
