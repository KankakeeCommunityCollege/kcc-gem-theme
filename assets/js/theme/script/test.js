// THIS IS A TEST
function test() {
  var re = /(\w+)\s(\w+)/;
  var str = 'John Smith';
  var newstr = str.replace(re, '$2, $1');
  console.log(newstr);
}
export default test;
