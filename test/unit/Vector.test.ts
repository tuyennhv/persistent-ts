import fc from "fast-check";
import {expect} from "chai";
import Vector from "../../src/Vector";

it("Vector.empty has a length of 0", () => {
  const empty = Vector.empty<void>();
  expect(empty.length).to.be.equal(0);
});

it("Vector.append increments the length", () => {
  const empty = Vector.empty<number>();
  expect(empty.append(1).length).to.be.equal(1);
  expect(empty.append(1).append(2).length).to.be.equal(2);
});

it("Vector.append works with many elements", () => {
  let acc = Vector.empty<number>();
  const times = 1025;
  for (let i = 0; i < times; ++i) {
    acc = acc.append(i);
  }
  expect(acc.length).to.be.equal(times);
  for (let i = 0; i < times; ++i) {
    expect(acc.get(i)).to.be.equal(i);
  }
});

it("Vector.get works", () => {
  const element = 1;
  const empty = Vector.empty<number>();
  const single = empty.append(element);
  expect(single.get(-1)).to.be.null;
  expect(single.get(1)).to.be.null;
  expect(empty.get(0)).to.be.null;
  expect(single.get(0)).to.be.equal(element);
});

it("Vector.set works", () => {
  const a = 0;
  const b = 1;
  const empty = Vector.empty<number>();
  const single = empty.append(a);
  expect(single.set(0, b).get(0)).to.be.equal(b);
});

it("Vector.pop works with many elements", () => {
  let acc = Vector.empty<number>();
  expect(acc.pop()).to.be.equal(acc);
  const times = 1025;
  for (let i = 0; i < 2 * times; ++i) {
    acc = acc.append(i);
  }
  for (let i = 0; i < times; ++i) {
    acc = acc.pop();
  }
  expect(acc.length).to.be.equal(times);
  for (let i = 0; i < times; ++i) {
    const g = acc.get(i);
    expect(g).to.be.equal(i);
  }
});

it("A Vector created from an array will spread to the same array", () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (data) => {
      let acc = Vector.empty<number>();
      for (const d of data) acc = acc.append(d);
      const arr = [...acc];
      expect(arr).to.be.deep.equal(data);
    })
  );
});
