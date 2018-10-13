const doAction = (action, model = {}) => {
  switch (action) {
    case 'UPDATE': {
      const msg = 'updates are cool';
      return { ...model, msg };
    }
    case 'REPLACE': {
      const msg = 'totally replace it';
      return { ...model, msg };
    }
    case 'SAVE': {
      const msg = 'saved it mang';
      return { ...model, msg };
    }
  }
};

const result = doAction('UPDATE', { id: 1 });
console.log(result);

const matched = x => ({
  on: () => matched(x),
  otherwise: () => x
});

const match = x => ({
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x)
});

const doMatchAction = (action, model = {}) =>
  match(action)
    .on(x => x === 'UPDATE', () => ({ ...model, msg: 'updates are cool' }))
    .on(x => x === 'REPLACE', () => ({ ...model, msg: 'totally replace it' }))
    .on(x => x === 'SAVE', () => ({ ...model, msg: 'save it mang' }))
    .otherwise(() => ({ ...model, msg: 'no action found' }));

const matchResult = doMatchAction('SAVE', { id: 1 });
console.log(matchResult);
