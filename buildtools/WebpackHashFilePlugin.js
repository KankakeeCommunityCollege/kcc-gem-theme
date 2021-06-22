const fs = require('fs');
const path = require('path');
const colors = require('colors'); // For nicer looking console output

function getFilesizeInBytes(filename) { // Small function to get the size of the output hash data using Node.js `fs.statSync()`
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

class WebpackHashFilePlugin{
  constructor (options){
    this.options= Object.assign({}, {
      fileName: 'hash.yml',
      path: '../_data'
  }, options)
}

  apply(compiler) {
    const options = this.options;
    compiler.hooks.done.tap("WebpackHashFilePlugin", stats => {
      const content = stats.hash;
      const outputPath = options.path;
      const fileName = options.fileName;
      const output = path.resolve(__dirname, outputPath, fileName);
      fs.writeFile(output, content, (err) => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      }, console.log(`Plugin {${colors.brightYellow('WebpackHashFilePlugin')}} created ${colors.brightWhite(output)} ${getFilesizeInBytes(output)} bytes ${colors.brightGreen('[built]')}`));
   });
  }
};
module.exports = WebpackHashFilePlugin;