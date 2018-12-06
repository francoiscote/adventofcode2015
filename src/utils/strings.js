/* eslint import/prefer-default-export: "off" */

export const split = (string = '', delimiter = '', transform = v => v) =>
  string.split(delimiter).map(v => transform(v));

export const splitLines = (string = '', transform = undefined) => split(string, /\r?\n/, transform);

/**
 * This utility function will get a string of consecutive numbers
 * and ouput an array of integers from those numbers.
 * @param {string} string original input string
 */

export const splitInt = (string) => {
  string.split('').map((v) => {
    const intVal = parseInt(v, 10);

    if (typeof intVal !== 'number') {
      throw new TypeError(`Character ${v} is not a number`);
    }

    return intVal;
  });
};
