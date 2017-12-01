/**
 * This utility function will get a string of consecutive numbers
 * and ouput an array of integers from those numbers.
 * @param {string} string original input string 
 */
function splitInt(string) {
  return string.split('').map((v) => {
    let intVal = parseInt(v, 10);

    if ( intVal !== intVal ) {
      throw new TypeError(`Character ${v} is not a number`);
    }

    return intVal;
  });
}

module.exports = {
  splitInt,
}

