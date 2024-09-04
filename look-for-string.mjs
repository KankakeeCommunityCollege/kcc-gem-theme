import { readdir, readFile } from 'node:fs';

const path = './';
const options = {
  recursive: true
}

const htmlFileRegExp = /.+\.(html|md|markdown|xml)$/;
// const jsFileRegExp = /.+\.(js)$/;
const stringRegExp = /\{\{\s?site\.title\s?\}\}/;
const stringRegExpGlobal = new RegExp(stringRegExp, 'g');

console.log(`\n==== [SEARCHING in: ${path}] ====`);

readdir(path, options, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  const pages = files.filter(file => file.search(/^\..+|node_modules\/.+|_site\/.+|assets\/.+|uploads\/.+$/));
  const htmlFiles = pages.filter(file => !file.search(htmlFileRegExp));

  htmlFiles.forEach(file => {
    readFile(`${path}/${file}`, 'utf8', (err, data) => {
      if (err) {
        console.error("Could not read file.", err);
        process.exit(1);
      }

      if (data.search(stringRegExp) !== -1) {
        const matches = data.match(stringRegExpGlobal);

        matches.forEach(match => console.log(`[FOUND]: ${match} in ${file}`));
      }
    });
  });
});

console.log(`\n====   [RESULTS]    ====`);
