function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return state + 1;
    }
    case 'DECREMENT': {
      return state - 1;
    }
    default: {
      return state;
    }
  }
}

console.log(counter(0, { type: 'INCREMENT' }));

const ternaryCounter = (state = 0, action) =>
  action.type === 'INCREMENT'
    ? state + 1
    : action.type === 'DECREMENT'
      ? state - 1
      : state;

console.log(ternaryCounter(10, { type: 'INCREMENT' }));

const executeIfFunction = f => (f instanceof Function ? f() : f);
const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase;
const switchcaseF = cases => defaultCase => key =>
  executeIfFunction(switchcase(cases)(defaultCase)(key));

const switchCounter = (state = 0, action) =>
  switchcaseF({
    RESET: 0,
    INCREMENT: () => state + 1,
    DECREMENT: () => state - 1
  })(state)(action.type);

console.log(switchCounter(20, { type: 'RESET' }));
