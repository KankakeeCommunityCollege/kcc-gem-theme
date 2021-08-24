// Loads the Clarus Corporation script used in geofencing campaigns
function loadClarusCorpScript() {
  let script = document.createElement('script');
  const head = document.head;
  
  script.src = 'https://tag.simpli.fi/sifitag/6089e310-26f9-0136-e8b0-06659b33d47c';
  script.async = true
  script.referrerPolicy = 'no-referrer-when-downgrade';
  head.appendChild(script);
}

export default loadClarusCorpScript;