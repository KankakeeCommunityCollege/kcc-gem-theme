function toggleClass(el) {
  return el.classList.toggle('accordion__icon--minus');
}

function findAccordionIcon(parent) {
  const THIS_ACCORDION_ICON = parent.querySelector('.accordion__icon');

  toggleClass(THIS_ACCORDION_ICON);
}

function onCollapseChangeFunction(stateChange) {
  $('.collapse').on(stateChange, function (e) {
    const COLLAPSE_PARENT = e.target.parentElement;
    //console.log(e.target.parentElement);
    findAccordionIcon(COLLAPSE_PARENT);
  });
}

function loopOverArr(arr) {
  let len = arr.length;

  for (var i = 0; i < len; i++) {
    onCollapseChangeFunction(arr[i]);
  }
}

function accordion() {
  const COLLAPSE_STATES_ARR = ['show.bs.collapse', 'hide.bs.collapse']; // BOOTSTRAP 4 specific collapse states

  loopOverArr(COLLAPSE_STATES_ARR);
}

export default accordion;
