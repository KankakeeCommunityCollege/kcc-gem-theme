const NAV_GLOBAL_BOTTOM_ID_STRING = 'navGlobalBottom';

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

  const navGlobalBottomEl = document.getElementById(NAV_GLOBAL_BOTTOM_ID_STRING);
  const navGlobalBottomBootstrapDropdownNodeList = navGlobalBottomEl.querySelectorAll('.nav-link.dropdown-toggle');

  loopOverNodeList(navGlobalBottomBootstrapDropdownNodeList);
  //window.addEventListener('resize', windowResizeHandler);
}

export default megaNavInit;
