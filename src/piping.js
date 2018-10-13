const composeLeftToRight = (v, fn) => fn(v);
const pipe = fns => v => fns.reduce(composeLeftToRight, v);

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
const shorterString = (str, len = 8) => str.substring(0, len);
const computeFullname = ({ firstName: f, lastName: l }) => `${f} ${l}`;
const capitalizeNames = ({ firstName: f, lastName: l }) => ({
  firstName: capitalize(f),
  lastName: capitalize(l)
});
const toFullnameForView = person => {
  let newPerson = capitalizeNames(person);
  let fullname = computeFullname(newPerson);
  return shorterString(fullname);
};

const pipeFullnameForView = pipe([
  capitalizeNames,
  computeFullname,
  shorterString
]);

const z = { firstName: 'zachary', lastName: 'abresch' };

console.log(toFullnameForView(z));
console.log(pipeFullnameForView(z));
