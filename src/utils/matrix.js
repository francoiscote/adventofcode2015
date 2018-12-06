export default class Matrix {
  constructor(width, height, defaultValue) {
    this.width = width;
    this.height = height;
    this.m = [];
    this.sections = [];

    for (let y = 0; y < height; y += 1) {
      const row = new Array(width).fill(defaultValue);
      this.m[y] = row;
    }
  }

  get matrix() {
    return this.m;
  }

  loopThrough({
    x = 0, y = 0, w = this.width, h = this.height,
  }, cb) {
    for (let row = y; row < y + h; row += 1) {
      for (let col = x; col < x + w; col += 1) {
        cb(col, row);
      }
    }
  }

  setSection({
    id, x, y, w, h, value,
  }) {
    if (Object.keys(this.sections).includes(id)) {
      throw new Error(`This Section is already registered: ${id}`);
    }

    // Save section
    this.sections.push({
      id,
      x,
      y,
      w,
      h,
    });

    // Save values in matrix
    this.loopThrough(
      {
        x,
        y,
        w,
        h,
      },
      (col, row) => {
        this.setValue(col, row, value);
      },
    );
  }

  getSections() {
    return this.sections;
  }

  getSection(id) {
    return this.sections[id];
  }

  setValue(x, y, value) {
    if (typeof value === 'function') {
      this.m[y][x] = value(this.m[y][x]);
    } else {
      this.m[y][x] = value;
    }
  }

  getValue(x, y) {
    return this.m[y][x];
  }
}
