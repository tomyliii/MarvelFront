export default function PagesCalculator(total, limit, set) {
  const arrayOfPages = [];
  console.log(total);
  let nbPages = Math.floor(total / limit);
  if (total % limit !== 0) {
    nbPages++;
    console.log(nbPages);
  }
  for (let i = 0; i < nbPages; i++) {
    arrayOfPages.push(i + 1);
  }
  console.log(arrayOfPages);
  return set([...arrayOfPages]);
}
