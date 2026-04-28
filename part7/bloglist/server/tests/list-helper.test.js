const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list-helper");
const {
  listWithNoBlogs,
  listWithOneBlog,
  listWithManyBlogs,
} = require("./blog-test-helper");

describe("Dummy", () => {
  test("returns one", () => {
    assert.strictEqual(listHelper.dummy(listWithNoBlogs), 1);
  });
});

describe("Total likes", () => {
  test("empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes(listWithNoBlogs), 0);
  });
  test("List with one blog, equals that blog", () => {
    assert.strictEqual(
      listHelper.totalLikes(listWithOneBlog),
      listWithOneBlog[0].likes,
    );
  });
  test("of a bigger list is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(listWithManyBlogs), 36);
  });
});

describe("Favorite blog", () => {
  test("Empty list is null", () => {
    assert.strictEqual(listHelper.favoriteBlog(listWithNoBlogs), null);
  });
  test("List with one blog, equals that blog", () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithOneBlog),
      listWithOneBlog[0],
    );
  });
  test("Bigger list is found right", () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithManyBlogs),
      listWithManyBlogs[2],
    );
  });
});

describe("Most blogs", () => {
  test("Empty list is null", () => {
    assert.strictEqual(listHelper.mostBlogs(listWithNoBlogs), null);
  });
  test("List with one blog, equals that author", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: listWithOneBlog[0].author,
      blogs: 1,
    });
  });
  test("Bigger list is found right", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithManyBlogs), {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("Most likes", () => {
  test("Empty list is null", () => {
    assert.strictEqual(listHelper.mostLikes(listWithNoBlogs), null);
  });
  test("List with one blog, equals that author", () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    });
  });
  test("Bigger list is found right", () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithManyBlogs), {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
