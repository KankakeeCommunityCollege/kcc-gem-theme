// Sets copyright year
function footerDate() {
  const d = new Date();
  const fullYear = d.getFullYear();
  document.getElementById('currentYear').innerHTML = fullYear;
}

document.addEventListener('DOMContentLoaded', function() {
  footerDate();
});
