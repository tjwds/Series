const Series = class {
  index = 0;
  values = [];

  constructor({ transformation, start: _start, previous: _previous }) {
    const scope = this;

    const start = _start || 0;
    this.start = start;
    this.transformation = transformation;

    let next = start;
    let previous = _previous || 0;

    const generator = function* () {
      scope[scope.index] = next;
      scope.values.push(next);
      scope.index = scope.index + 1;
      yield next;
      while (true) {
        const answer = transformation({
          n: next,
          previous,
        });
        previous = next;
        next = answer;

        // yes, this gets stuck on as a string, but … close enough.
        scope[scope.index] = next;
        scope.values.push(answer);
        scope.index = scope.index + 1;

        yield answer;
      }
    };

    this._series = generator();
  }

  get next() {
    return this._series.next().value;
  }

  get(targetIndex) {
    const values = this.values;
    const response = values[targetIndex];
    if (typeof response !== "undefined") {
      return response;
    }

    let index = this.index;
    while (index <= targetIndex) {
      const next = this.next;
      if (index === targetIndex) {
        return next;
      }
      index++;
    }
  }

  [Symbol.iterator]() {
    return this._series;
  }
};

export default Series;
