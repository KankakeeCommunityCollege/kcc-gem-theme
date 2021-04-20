function checkForPrefersReduceMotion() {
  const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const userAgent = window.navigator.userAgent;
  const msExplorer = (userAgent.search(/MSIE/g) !== -1)
  let reducedMotion;

  reducedMotionMediaQuery.matches ? reducedMotion = true : reducedMotion = false;
  localStorage.setItem('userPrefersReducedMotion', reducedMotion);

  if (msExplorer)  // Bail out at this point if user is in IE
    return;        // IE does NOT support `mediaQueryList.onchange`

  reducedMotionMediaQuery.addEventListener('change', (e) => {
    reducedMotionMediaQuery.matches ? reducedMotion = true : reducedMotion = false;
    localStorage.setItem('userPrefersReducedMotion', reducedMotion);
  });
}

export default checkForPrefersReduceMotion;