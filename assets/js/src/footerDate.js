const YEAR_SPAN = document.getElementById('currentYear');

function footerDate() {
  const d = new Date();
  const year = d.getFullYear();
  
  if (YEAR_SPAN.innerHTML === `${year}`)
    return;

  YEAR_SPAN.innerHTML = year;
}
export default footerDate;
