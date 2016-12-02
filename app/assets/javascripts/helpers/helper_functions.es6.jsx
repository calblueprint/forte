function intersection(a, b) {
  let set1 = new Set(a);
  let set2 = new Set(b);
  let intersection = new Set(
    [...set1].filter(x => set2.has(x)));
  return Array.from(intersection);
}
