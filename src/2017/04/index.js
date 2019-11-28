const passphrases = require("./input").split("\n");
const _ = require("lodash");

// -------------------------------------
// PART 1
// -------------------------------------

const solution1 = passphrases.filter(pass => {
  const re = /\b(\w+)\b(?=.*\b\1\b)/g;
  return !re.exec(pass);
});

console.log("Part 1:", solution1.length);

// -------------------------------------
// PART 2
// -------------------------------------
const solution2 = passphrases.filter(pass => {
  // Sort word letters
  const words = pass.split(" ");
  const sortedWords = words.map(w =>
    w
      .split("")
      .sort()
      .join("")
  );
  const sortedPass = sortedWords.join(" ");

  // Use same regex as part 1
  const re = /\b(\w+)\b(?=.*\b\1\b)/g;
  return !re.exec(sortedPass);
});

console.log("Part 2:", solution2.length);
