const NAV_GLOBAL_BOTTOM_ID_STRING = 'navGlobalBottom';
const DEVICE_SUPPORTS_EXPANDED_NAVIGATION = window.matchMedia('screen and (min-width: 992px)').matches || window.matchMedia('screen and (min-height: 992px)').matches; // 992px corresponds to Bootstrap 4

function windowResizeHandler() {
  if ( window.innerWidth >= 992 ) {

  }
}

function mouseEnterHandler(event) {
  console.log(event.target.parentElement);
}

function addDropdownEventListener(node) {
  node.addEventListener('mouseenter', mouseEnterHandler);
}

function loopOverNodeList(nodeList) {
  let len = nodeList.length;

  for (var i = 0; i < len; i++) {
    let dropdownToggleNode = nodeList[i];

    addDropdownEventListener(dropdownToggleNode);
  }
}

function megaNavInit() {

  if ( !document.getElementById('headerGlobalNavbar') )
    return;

  // TODO:
  // 1.) Add bail-out if screen can never be wider than 992px:
  // use `window.matchMedia(mediaQueryString).matches` method
  if ( ! DEVICE_SUPPORTS_EXPANDED_NAVIGATION )
    return;

  // 2.) Use the "orientationchange event" to handle orientation changes on mobile devices:
  // The "orientationchange" event will only work in mobile (not supported in any desktop browser)

  // 3.) Add screen-size check:
  // IF: screen is larger than 992px, fire JS to add mouseenter listener.
  // ELSE: add screen resize event-listener & handler function

  // 4.) Move this stuff into its own function:
  const navGlobalBottomEl = document.getElementById(NAV_GLOBAL_BOTTOM_ID_STRING);
  const navGlobalBottomBootstrapDropdownNodeList = navGlobalBottomEl.querySelectorAll('.nav-link.dropdown-toggle');

  loopOverNodeList(navGlobalBottomBootstrapDropdownNodeList);
  //window.addEventListener('resize', windowResizeHandler);
}

export default megaNavInit;
