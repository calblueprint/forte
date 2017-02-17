function intersection(a, b) {
  let set1 = new Set(a);
  let set2 = new Set(b);
  let intersection = new Set(
    [...set1].filter(x => set2.has(x)));
  return Array.from(intersection);
}

function priceToStripePrice(price) {
  var stripePrice = parseFloat(price) * 100;
  return stripePrice
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
