/* eslint import/prefer-default-export: "off" */

export const split = (string = '', delimiter = ',', transform = v => v) =>
  string.split(delimiter).map(transform)

export const splitLines = (string = '', transform = undefined) =>
  split(string, /\r?\n/, transform)
