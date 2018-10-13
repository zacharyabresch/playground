// function generateHeightStyle(itemCountProp, totalCountProp) {
//   totalCountProp = totalCountProp || 'totalQuestionsCount';

//   return Ember.computed(itemCountProp, totalCountProp, function() {
//     var percentage;
//     var itemCount = this.get(itemCountProp);
//     var totalCount = this.get(totalCountProp);

//     if (itemCount === 0 || totalCount === 0) {
//       // set percentage to 2 so that we can see a sliver of the bar chart, instead of nothing.
//       percentage = 2;
//     } else {
//       percentage = Math.round(itemCount / totalCount * 100);
//     }

//     return `height: ${percentage}%`;
//   });
// }

const ZERO_PREDICATE = [2, 100]; // sets percentage to 2
const someZero = values => (values.some(x => x === 0) ? [] : values);
const calculatePct = ([numerator, denominator]) => Math.round((numerator / denominator) * 100);
const pctBase = pred => (pred.length ? pred : ZERO_PREDICATE); // shows a sliver of chart instead of nothing
const percentage = (counts, pred = someZero(counts)) => calculatePct(pctBase(pred));
const generateHeightString = (itemCount = 0, totalCount = 0) =>
  `height: ${percentage([itemCount, totalCount])}`;

console.log(generateHeightString());
console.log(generateHeightString(5, 10));
// export default function generateHeightStyle(itemCountProp, totalCountProp = 'totalQuestionsCount') {
//   return Ember.computed(itemCountProp, totalCountProp, function() {
//     const { itemCount, totalCount } = this.getProperties(itemCountProp, totalCountProp);
//     return generateHeightString(itemCount, totalCount);
//   });
// }
