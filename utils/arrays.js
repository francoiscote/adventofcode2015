function combinations(array, comparator) {
  array.forEach((e1, index) => {
    const remainder = array.slice(index + 1);
    remainder.forEach((e2) => {
      comparator(e1, e2);
    });
  });
}

module.exports = {
  combinations,
};