

function checkForPrefersReduceMotion() {
  const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion;

  reducedMotionMediaQuery.matches ? reducedMotion = true : reducedMotion = false;
 
  localStorage.setItem('userPrefersReducedMotion', reducedMotion);

  reducedMotionMediaQuery.addEventListener('change', (e) => {
    reducedMotionMediaQuery.matches ? reducedMotion = true : reducedMotion = false;
    localStorage.setItem('userPrefersReducedMotion', reducedMotion);
  });
}

export default checkForPrefersReduceMotion;