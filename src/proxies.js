const CATEGORIES = ctx => ({
  content: {
    things: [1]
  },
  grading: {
    things: [1, 2]
  },
  other: {
    things: [1, 2, 3]
  }
});

const fallthrough = {
  things: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : fallthrough)
};

const context = {
  faces: () => console.log('things')
};
const p = new Proxy(CATEGORIES(context), handler);

let lookup = p.content;
console.log(lookup);
lookup = p.ugly;
console.log(lookup);
