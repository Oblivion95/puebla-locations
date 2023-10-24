function makeAPICall(value) {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        response: value,
      });
    }, 200)
  );
}

const reqs = ["hello", "world", "foo", "bar"];

const test = reqs.reduce(
  (prev, req) =>
    prev.then((acc) => makeAPICall(req).then((res) => [...acc, res])),
  Promise.resolve([])
);

test.then(console.log);
