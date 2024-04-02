import { readdir, readFile } from 'node:fs';

const path = './assets/js';
const options = {
  recursive: true
}

const distRegExp = /dist\//;
const jsFileRegExp = /.+\.js/;
// Look for use of jQuery or dataset JS
// BS5 ditched jQuery and `data-attr` have changed to `data-bs-attr`
const deprecatedJSRegExp = /(\$\([^\)]+\)|\.dataset|data-)/;

console.log(`\n==== [SEARCHING in: ${path}] ====`);

readdir(path, options, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  const jsFiles = files
    .filter(file => file.search(distRegExp))
    .filter(file => !file.search(jsFileRegExp))

  jsFiles.forEach(file => {
    readFile(`${path}/${file}`, 'utf8', (err, data) => {
      if (err) {
        console.error("Could not read file.", err);
        process.exit(1);
      }

      if (data.search(deprecatedJSRegExp) !== -1) {
        const matches = data.match(deprecatedJSRegExp);

        matches.forEach(match => console.log(`[FOUND]: "${match}" in ${file}`));
      }
    });
  });
})

console.log(`\n====   [RESULTS]    ====`);
