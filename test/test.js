import Series from "../";

test("New simple series", () => {
  const series = new Series({
    start: 1,
    transformation: ({ n }) => n * 2,
  });
  expect(series.next).toBe(1);
  expect(series.next).toBe(2);
  expect(series.next).toBe(4);
});

test(".get an arbitrary index", () => {
  const series = new Series({
    start: 1,
    transformation: ({ n }) => n * 2,
  });
  expect(series.get(20)).toBe(1048576);
});

test("fibonacci works", () => {
  const fibonacci = new Series({
    start: 1,
    transformation: ({ n, previous }) => n + previous,
  });
  expect(fibonacci.next).toBe(1);
  expect(fibonacci.next).toBe(1);
  // really the 20th — 0 indexed!
  expect(fibonacci.get(19)).toBe(6765);
});

test("series is an iterator", () => {
  const series = new Series({
    transformation: ({ n }) => n + 1,
  });
  let loop = 0;
  for (let key of series) {
    loop++;
    if (loop > 1337) {
      expect(key).toBe(1337);
      break;
    }
  }
});
